import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10; // أو تقدر تجيبها من process.env.SALT_ROUNDS

  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  async compareHash(text: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(text, hashedText);
  }
}
