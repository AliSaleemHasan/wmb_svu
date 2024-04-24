import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/song/song.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
  ) {}

  async getAllArtist() {
    return await this.artistRepo.find();
  }

  async search(name: string) {
    return this.artistRepo
      .createQueryBuilder('artist')
      .where('artist.FName LIKE :q OR artist.LName LIKE :q ', {
        q: `%${name}%`,
      })
      .getMany();
  }

  async getById(id: number) {
    return await this.artistRepo.findOne({
      where: { id },
      relations: ['songs'],
    });
  }
  async createArtist(artist: Partial<Artist>) {
    let newArtist = await this.artistRepo.create(artist);
    newArtist.songs = [];
    return await this.artistRepo.save(newArtist);
  }

  async deleteArtist(id: number) {
    let artist = await this.artistRepo.findOne({ where: { id } });
    return await this.artistRepo.remove(artist);
  }

  async updateArtist(id: number, artist: Partial<Artist>) {
    return await this.artistRepo.update({ id }, { ...artist });
  }

  async addSongToArtist(artistId: number, songData: Partial<Song>) {
    const artist = await this.artistRepo.findOne({ where: { id: artistId } });

    if (!artist) {
      throw new Error('Artist not found');
    }

    const newSong = await this.songRepo.create({
      ...songData,
      artist: artist,
    });

    await this.songRepo.save(newSong);

    if (!artist.songs) artist.songs = [];

    artist.songs.push(newSong);

    return await this.artistRepo.save(artist);
  }
}
