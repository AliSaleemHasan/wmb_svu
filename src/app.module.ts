import { configService } from './config/configService';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './customers/customers.module';
import { UsersController } from './customers/customers.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    ArtistModule,
    SongModule,
    OrderModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
