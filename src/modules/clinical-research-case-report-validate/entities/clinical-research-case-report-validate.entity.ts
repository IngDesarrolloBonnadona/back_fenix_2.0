import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
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

@Entity({ name: 'fenix_clinical_research_case_report_validate' })
export class ClinicalResearchCaseReportValidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  res_crv_clinicalresearch_id_fk: string;

  @Column({ type: 'uuid' })
  res_crv_validatedcase_id_fk: string;

  @Column({ default: true })
  res_crv_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ClinicalResearch,
    (clinicalResearch) => clinicalResearch.clinicalResearchCaseReportValidate,
  )
  @JoinColumn({ name: 'res_crv_clinicalresearch_id_fk' })
  clinicalResearch: ClinicalResearch;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.clinicalResearchCaseReportValidate,
  )
  @JoinColumn({ name: 'res_crv_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
