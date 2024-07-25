import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_damage_type' })
export class DamageType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  dam_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  dam_t_description: string;

  @Column({ default: true })
  dam_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}