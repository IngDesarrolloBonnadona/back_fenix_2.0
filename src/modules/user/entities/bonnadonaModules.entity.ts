import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Modules {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32, unique: true })
  name!: string;

  @Column({ length: 256, nullable: true })
  entrypoint?: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;
}
