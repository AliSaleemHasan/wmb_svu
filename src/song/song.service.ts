import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Song } from './song.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async getAllSongs() {
    return await this.songRepository.find({ relations: { artist: true } });
  }

  async SearchByName(title: string) {
    return await this.songRepository.find({
      where: { title: Like(`%${title}%`) },
      relations: { artist: true },
    });
  }

  async updateSong(id: number, songData: Partial<Song>) {
    let song = this.songRepository.findOne({ where: { id } });

    if (!song) throw new Error('Song not found');

    return await this.songRepository.update({ id }, songData);
  }

  async deleteSong(id: number) {
    return await this.songRepository.delete({ id });
  }
}
