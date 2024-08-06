import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => ClinicalResearch, (clinicalResearch) => clinicalResearch.deviceType)
  clinicalResearch: ClinicalResearch[];
}
