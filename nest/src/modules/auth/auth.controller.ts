import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserServices } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.model';
import { AuthGuard } from './auth.guards';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signup: User) {
    const user = await this.authService.signup(signup.email, signup.password);
    return { ok: true, user: { id: user._id, email: user.email } };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() login: User) {
    const valid = await this.authService.validateUser(login.email, login.password);
    if (!valid) return { ok: false, error: 'Invalid credentials' };
    return this.authService.login(valid as any);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}