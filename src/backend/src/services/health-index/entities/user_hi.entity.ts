import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class USER_HI {
  @Column()
  username: string;

  @Column()
  hi_id: number;
}
