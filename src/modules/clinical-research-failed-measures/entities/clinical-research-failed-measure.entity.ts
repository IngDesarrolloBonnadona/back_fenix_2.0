import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'fenix_clinical_research_failed_measure' })
export class ClinicalResearchFailedMeasure {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    meas_fcr_clinicalresearch_id_fk: number;
  
    @Column()
    meas_fcr_failedmeasures_id_fk: number;
  
    @Column({ default: true })
    meas_fcr_status: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updateAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
}
