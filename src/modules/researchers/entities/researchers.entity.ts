import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Researcher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  res_validatedcase_id_fk: string;

  @Column()
  res_ra_useranalyst_id: number;

  @Column()
  res_ra_userresearch_id: number;

  @Column()
  res_ra_days: number

  @Column({ default: true })
  res_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.researcher,
  )
  @JoinColumn({ name: 'res_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
