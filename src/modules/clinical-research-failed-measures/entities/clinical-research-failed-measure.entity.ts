import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import { FailedMeasure } from 'src/modules/failed-measures/entities/failed-measure.entity';
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

@Entity({ name: 'fenix_clinical_research_failed_measure' })
export class ClinicalResearchFailedMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  meas_fcr_clinicalresearch_id_fk: string;

  @Column()
  meas_fcr_failedmeasure_id_fk: number;

  @Column({ default: true })
  meas_fcr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ClinicalResearch,
    (clinicalResearch) => clinicalResearch.clinicalResearchFailedMeasure,
  )
  @JoinColumn({ name: 'meas_fcr_clinicalresearch_id_fk' })
  clinicalResearch: ClinicalResearch;

  @ManyToOne(
    () => FailedMeasure,
    (failedMeasure) => failedMeasure.clinicalResearchFailedMeasure,
  )
  @JoinColumn({ name: 'meas_fcr_failedmeasure_id_fk' })
  failedMeasure: FailedMeasure;
}
