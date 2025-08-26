import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user!: User;

  /** 평문이 아닌 bcrypt 해시 저장 */
  @Column({ type: 'varchar', length: 200 })
  tokenHash!: string;

  /** 만료 시각(없으면 무기한 취급) */
  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  /** 로그아웃/폐기 시각 */
  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  revokedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}