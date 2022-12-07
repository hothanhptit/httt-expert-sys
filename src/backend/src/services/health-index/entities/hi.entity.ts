import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gi: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  ldl: number;

  @Column()
  hdl: number;

  @Column()
  trigl: number;

  @Column()
  hi: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date_created: string;
}
