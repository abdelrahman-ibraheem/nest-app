
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServices } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/user.repo';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.model';
import { HashService } from 'src/comoon/utils/hash';
import { LoginDto } from 'src/modules/auth/auth_dto/signup.dto';
interface IUserServices {
    validateUser(email: string, pass: string): Promise<any>;
    login(user: User): Promise<{ access_token: string }>;
    signup(email: string, password: string): Promise<User>;
}
@Injectable()

export class AuthService {
  constructor(
    private usersService: UserServices,
    private jwtService: JwtService,
    private usersRepo: UserRepository,
    private hashService: HashService
  ) {}
  


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user || !user.password) return null;
    const match = await bcrypt.compareHash(pass, user.password);
    if (match) {
      const { password, ...res } = user as any;
      return res;
    }
    return null;
  }

  async login(data: LoginDto) {
const {email,password}= data
    const user = await this.usersRepo.findByEmail(email);
    if (!user||!await this.hashService.compareHash(password,user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    const accessToken = await this.jwtService.sign({
      _id: user.id,
    },{
      secret: process.env.JWT_SECRET as string,
    })
    return {
      access_token : accessToken,
    }
  }
async signup(email: string, password: string): Promise<User> {
    const existing = await this.usersRepo.findByEmail(email);
    if (existing) 
        throw new UnauthorizedException('Email already used');
    const hashed = await this.hashService.hash(password);
    const user = await this.usersService.createUser(email, hashed);
    return user;
  }

}
export default IUserServices;

