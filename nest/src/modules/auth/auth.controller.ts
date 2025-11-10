import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, UsePipes, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserServices } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.model';
import { AuthGuard } from './auth.guards';
import { zodValidationPipe } from 'src/comoon/pipes/zod.pipe';
import { loginSchema } from './signup.zod';
import { LoggerInterceptor } from 'src/comoon/interceptors/logger.interceptors';


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
  @UsePipes(new zodValidationPipe(loginSchema))
  async login(@Body() login: User) {
    const valid = await this.authService.validateUser(login.email, login.password);
    if (!valid) return { ok: false, error: 'Invalid credentials' };
    return this.authService.login(valid as any);
  }
  @UseInterceptors(LoggerInterceptor)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}