import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './bonnadonaUsers.entity';
import { Position } from './bonnadonaPosition.entity';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32 })
  phone!: string;

  @Column({ length: 32, nullable: true })
  address?: string;

  @Column({ length: 64, nullable: true })
  city?: string;

  @Column({ length: 64, nullable: true })
  country?: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  attendant?: boolean;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;

  @JoinColumn()
  @OneToOne((_type) => Users, (user) => user.details)
  user!: Users;

  @ManyToOne((_type) => Position, (position) => position.details)
  position!: Position;
}
