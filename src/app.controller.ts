import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller("api")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //Set up route for "login" on "localhost:3000/api/login"
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() request) {
    return this.authService.login(request.user)
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getProfile(@Request() request){
    return request.user;
  }
  
}
