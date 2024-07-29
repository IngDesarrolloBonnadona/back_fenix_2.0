import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
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

@Entity({ name: 'fenix_log' })
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  log_validatedcase_id_fk: string;

  @Column({ type: 'varchar' })
  log_user_id: string;

  @Column({ type: 'varchar' })
  log_action: string;

  @Column({ type: 'varchar' })
  log_ip: string;

  @Column({ default: true })
  log_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.log,
  )
  @JoinColumn({ name: 'log_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
