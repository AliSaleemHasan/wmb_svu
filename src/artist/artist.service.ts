import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
  ) {}

  async getAllArtist() {
    return await this.artistRepo.find();
  }

  async getById(id: number) {
    return await this.artistRepo.findOne({ where: { id } });
  }
  async createArtist(artist: Partial<Artist>) {
    let newArtist = await this.artistRepo.create(artist);
    return await this.artistRepo.save(newArtist);
  }

  async deleteArtist(id: number) {
    return await this.artistRepo.delete({ id });
  }

  async updateArtist(id: number, artist: Partial<Artist>) {
    return await this.artistRepo.update({ id }, { ...artist });
  }
}
