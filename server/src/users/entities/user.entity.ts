import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index
} from 'typeorm';

@Entity('users')
@Index(['provider', 'providerId'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 반드시 type 지정!
  @Column({ type: 'varchar', length: 32, nullable: true })
  provider: string | null;   // 'google'

  @Column({ type: 'varchar', length: 128, nullable: true })
  providerId: string | null; // Google sub

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;
}