import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('social_accounts')
@Unique(['provider', 'providerId'])
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  providerId: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;
}
