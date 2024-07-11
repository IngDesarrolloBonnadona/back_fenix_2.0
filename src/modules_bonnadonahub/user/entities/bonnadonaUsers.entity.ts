import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetails } from './bonnadonaDetails.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32 })
  name!: string;

  @Column({ length: 32 })
  lastname!: string;

  @Column({ length: 128, unique: true })
  email!: string;

  @Column({ length: 32 })
  document!: string;

  @Column({ length: 256, select: false })
  password!: string;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;

  @OneToOne((_type) => UserDetails, (details) => details.user)
  details!: UserDetails;

}
