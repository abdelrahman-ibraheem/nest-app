import { Module, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserModel } from 'src/models/user.model';
import { UserRepository } from 'src/modules/user/user.repo';
import { APP_GUARD } from '@nestjs/core';

const jwtConstants = {
  secret: 'your_jwt_secret_key',
  expiresIn: 3600,
};  

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Module({
  imports: [
    UserModel,
    PassportModule,
    JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: jwtConstants.expiresIn } }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UserRepository,
    JwtService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}


