import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_failed_measures' })
export class FailedMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  meas_f_name: string;

  @Column({ type: 'varchar', nullable: true })
  meas_f_description: string;

  @Column({ default: true })
  meas_f_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
