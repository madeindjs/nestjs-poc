import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}
