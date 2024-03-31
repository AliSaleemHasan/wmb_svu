import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Song } from '../song/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Song])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
