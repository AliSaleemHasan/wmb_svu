import {
    Controller,
    Post,
    UseGuards,
    Body,
    Get,
    Res,
    Request,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  // import { Public } from './guards/auth.guard';
  import { RefreshAuthGuard } from './guards/refresh-guard';
  import { Response } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('login')
    async login(@Body() body) {
      return await this.authService.login(body);
    }
  
    @Post('signup')
    async signup(@Body() body: any) {
      return await this.authService.signUp(body);
    }
  
    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
      return await this.authService.refreshToken(req.user);
    }
  }
  