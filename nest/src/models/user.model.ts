
import { Hash, hash } from 'crypto';
import { Column, Model, Table } from 'sequelize-typescript';
import { HashService } from 'src/comoon/utils/hash';
import { MongooseModule, Prop, SchemaFactory } from '@nestjs/mongoose'; 
import { Brand } from './brand.model';
import slugify from 'slugify';
import { SignupDto } from 'src/modules/auth/auth_dto/signup.dto';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string
  
  @Prop({
    type: String,
    required: true,

    get: function(this:SignupDto) {
    return this.firstName + ' ' + this.lastName;
    },
        set: function(value: string) {
        const firstName= value.split(' ')[0];
      const lastName= value.split(' ')[0];
      this.set({firstName,lastName});

        }
  })
  username: string;

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

const BrandSchema= SchemaFactory.createForClass(Brand);
BrandSchema.pre('save', function (next) {
    this.slug=slugify(this.name,{
 lower:true,
    })
    next();
})
export const UserModel=MongooseModule.forFeature([{name:Brand.name,schema:BrandSchema}]);


    

