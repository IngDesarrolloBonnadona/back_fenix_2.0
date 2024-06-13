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
  res_documentresearcher: string;

  @Column()
  res_nameresearcher: string;

  @Column()
  res_lastnameresearcher: string;

  @Column()
  res_validatedcase_id_fk: string;

  @Column()
  res_analyst_id_fk: number;

  @Column()
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

  @ManyToOne(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.researcher,
  )
  @JoinColumn({ name: 'res_analyst_id_fk' })
  reportAnalystAssignment: ReportAnalystAssignment;
}
