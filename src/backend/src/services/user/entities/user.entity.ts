import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name:string;

  @Column()
  username:string;

  @Column()
  password:string;

}
