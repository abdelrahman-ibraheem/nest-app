
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string
  
   @Column
  password: string;
  @Column

  userId : string;
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