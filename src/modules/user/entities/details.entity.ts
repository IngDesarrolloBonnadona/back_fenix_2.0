import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
