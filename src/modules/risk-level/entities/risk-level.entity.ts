import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_risk_level' })
export class RiskLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  ris_l_name: string;

  @Column({ type: 'varchar', nullable: true })
  ris_l_description: string;

  @Column({ default: true })
  ris_l_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.riskLevel,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.riskLevel,
  )
  caseReportValidate: CaseReportValidate[];
}
