
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  bmi: number;

  @Column('int')
  age: number;

  @Column()
  gi: number;
}