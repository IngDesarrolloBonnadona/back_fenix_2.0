import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import { InfluencingFactor } from 'src/modules/influencing-factor/entities/influencing-factor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'fenix_clinical_research_influencing_factor' })
export class ClinicalResearchInfluencingFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  inf_fcr_clinicalresearch_id_fk: string;

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

  @ManyToOne(
    () => ClinicalResearch,
    (clinicalResearch) => clinicalResearch.clinicalResearchInfluencingFactor,
  )
  @JoinColumn({ name: 'inf_fcr_clinicalresearch_id_fk' })
  clinicalResearch: ClinicalResearch;

  @ManyToOne(
    () => InfluencingFactor,
    (influencingFactor) => influencingFactor.clinicalResearchInfluencingFactor,
  )
  @JoinColumn({ name: 'inf_fcr_influencingfactor_id_fk' })
  influencingFactor: InfluencingFactor;
}
