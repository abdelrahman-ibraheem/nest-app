import { Controller, Get, Param } from '@nestjs/common';
import { UserServices } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UserServices) {}

  @Get('confirm/:userId')
  async confirm(@Param('userId') userId: string) {
    const res = await this.usersService.confirmEmail(userId);
    if (!res) return { ok: false };
    return { ok: true };
  }
}
