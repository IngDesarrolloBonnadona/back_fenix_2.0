import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Position } from './bonnadonaPosition.entity';
import { RolesPermissions } from './bonnadonaRolesPermissions.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 32, unique: true })
  name!: string;

  @Column({ length: 200, nullable: true })
  description?: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;

  @OneToMany(
    _type => Position,
    pos => pos.role,
  )
  positions?: Position[];

  @OneToMany(
    _type => RolesPermissions,
    rp => rp.role,
  )
  rp?: RolesPermissions[];
}
