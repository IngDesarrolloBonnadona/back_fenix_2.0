import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_device' })
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  dev_case_id_fk: string;

  @Column({ type: 'varchar' })
  dev_code: string;

  @Column({ type: 'varchar' })
  dev_name: string;

  @Column({ type: 'varchar', nullable: true })
  dev_description: string;

  @Column({ default: true })
  dev_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.device,
  )
  @JoinColumn({ name: 'dev_case_id_fk' })
  caseReportOriginal: CaseReportOriginal;
}
