import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
