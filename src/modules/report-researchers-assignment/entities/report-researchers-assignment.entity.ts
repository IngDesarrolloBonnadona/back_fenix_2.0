import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
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

@Entity({ name: 'fenix_report_researcher_assignment' })
export class ReportResearcherAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  res_validatedcase_id_fk: string;

  @Column()
  res_useranalyst_id: number;

  @Column()
  res_userresearch_id: number;

  @Column()
  res_days: number;

  @Column({ default: false })
  res_isreturned: boolean;

  @Column({ default: true })
  res_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.reportResearcherAssignment,
  )
  @JoinColumn({ name: 'res_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
