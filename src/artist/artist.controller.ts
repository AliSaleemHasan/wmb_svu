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
import { ArtistService } from './artist.service';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Artist } from './artist.entity';
import { Song } from '../song/song.entity';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Post('')
  async createArtist(@Body() body: Partial<Artist>) {
    return { data: await this.artistService.createArtist(body) };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Get('/search/:q')
  async searchArtist(@Param('q') q: string) {
    return { data: await this.artistService.search(q) };
  }

  @UseGuards(JwtGuard)
  @Get('')
  async getAllArtists() {
    const artists = await this.artistService.getAllArtist();
    return { data: artists, success: true };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getArtistByID(@Param('id') id: number) {
    return { data: await this.artistService.getById(id) };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deteleArtist(@Param('id') id: string) {
    return { data: await this.artistService.deleteArtist(+id) };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateArtist(@Param('id') id: string, @Body() body: Partial<Artist>) {
    return { data: await this.artistService.updateArtist(+id, body) };
  }

  //   songs

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Post(':id/song')
  async addSongsForArtist(
    @Param('id') id: string,
    @Body() body: Partial<Song>,
  ) {
    return { data: await this.artistService.addSongToArtist(+id, body) };
  }
}
