import { Controller, Get, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req, @Res() res) {
    req.logOut();
    // res.redirect('/');
    delete req.user;
    res.send('loggedOut');
  }
}
