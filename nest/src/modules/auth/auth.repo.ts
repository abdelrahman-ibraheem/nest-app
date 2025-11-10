import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class authRepo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

   @Column()
  email: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;
}