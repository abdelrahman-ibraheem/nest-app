import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserRepository } from './user.repo';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface IUserServices {
    createUser(email: string, hashedPassword: string): Promise<User>;
    confirmEmail(userId: string): Promise<User | null>;
    setPassword(userId: string, newPassword: string): Promise<User | null>;
    remove(id: string): Promise<void>;

}
@Injectable()
export class UserServices implements IUserServices {


  constructor(
    private usersRepo: UserRepository, private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}



    async createUser(email: string, hashedPassword: string): Promise<User> {
    const user = this.usersRepo.create({ email, password: hashedPassword });
    return this.usersRepo.save(user);
  }
  async confirmEmail(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) return null;
    user.emailConfirmed = true;
    return this.usersRepo.save(user);
  }

  async setPassword(userId: string, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) return null;
    user.password = await bcrypt.hash(newPassword, 10);
    return this.usersRepo.save(user);
  }


  async remove(id: string): Promise<void> {
    const user = await  this.usersRepo.findOne(id as any);
    await user?.destroy();
  }
}
    export default IUserServices;

