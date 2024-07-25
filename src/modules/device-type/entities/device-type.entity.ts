import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_device_type' })
export class DeviceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  dev_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  dev_t_description: string;

  @Column({ default: true })
  dev_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
