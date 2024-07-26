import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from 'typeorm';

// @Entity({ name: 'fenix_clinical_research_influencing_factor'})
export class ClinicalResearchInfluencingFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inf_fcr_clinicalresearch_id_fk: number;

  @Column()
  inf_fcr_influencingfactor_id_fk: number;

  @Column({ default: true })
  inf_fcr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
