
import { Hash, hash } from 'crypto';
import { Column, Model, Table } from 'sequelize-typescript';
import { HashService } from 'src/comoon/utils/hash';
import { Prop } from '@nestjs/mongoose'; 

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string
  
  @Prop({
    type: String,
    required: true,
    set: function(value: string) {
      const hashedPassword = hash(value, Buffer.from(process.env.SALT as string, 'utf-8'));
      return hashedPassword;
    }
  })
  @Column
  password: string;
  @Column

  userId: string;
  @Column
  username: string;
  
     @Column
  email: string;
  @Column
  isAdmin: boolean;
  
     @Column
   googleId: string;
   @Column _id:string;
  @Column emailConfirmed :boolean;
    @Column({ defaultValue: true })


  isActive: boolean;
}
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Moderator = 'moderator',
}


    

