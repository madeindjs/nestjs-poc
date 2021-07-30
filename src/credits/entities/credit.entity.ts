import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'text', nullable: false })
  method: string;

  @Column({ type: 'text', nullable: false })
  parameters: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
}
