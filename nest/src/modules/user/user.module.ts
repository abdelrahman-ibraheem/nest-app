
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/user.model';
import { UserController } from './user.controller';
import { UserServices } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserServices],
  controllers: [UserController],
})
export class UsersModule {}