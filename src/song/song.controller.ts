import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Song } from './song.entity';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private songService: SongService) {}

  //   songs

  @UseGuards(JwtGuard)
  @Get()
  async getAllSongs() {
    return { data: await this.songService.getAllSongs() };
  }

  @UseGuards(JwtGuard)
  @Get(':title')
  async search(@Param('title') title: string) {
    return { data: await this.songService.SearchByName(title) };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Put('/:songId')
  async updateSongForArtist(
    @Param('songId') id: string,
    @Body() body: Partial<Song>,
  ) {
    return { data: await this.songService.updateSong(+id, body) };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Delete('/:songId')
  async deleteSong(@Param('songId') id: string) {
    return { data: await this.songService.deleteSong(+id) };
  }
}
