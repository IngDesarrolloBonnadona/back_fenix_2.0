import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { ClinicalResearchCaseReportValidate } from 'src/modules/clinical-research-case-report-validate/entities/clinical-research-case-report-validate.entity';
import { ClinicalResearchFailedMeasure } from 'src/modules/clinical-research-failed-measures/entities/clinical-research-failed-measure.entity';
import { ClinicalResearchInfluencingFactor } from 'src/modules/clinical-research-influencing-factor/entities/clinical-research-influencing-factor.entity';
import { DamageType } from 'src/modules/damage-type/entities/damage-type.entity';
import { DeviceType } from 'src/modules/device-type/entities/device-type.entity';
import { FluidType } from 'src/modules/fluid-type/entities/fluid-type.entity';
import { ResearchInstrument } from 'src/modules/research-instrument/entities/research-instrument.entity';
import { RiskFactor } from 'src/modules/risk-factor/entities/risk-factor.entity';
import { SafetyBarrier } from 'src/modules/safety-barriers/entities/safety-barrier.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_clinical_research' })
export class ClinicalResearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: false })
  res_c_isComplete: boolean;

  @Column({ nullable: true })
  res_c_instrument_id_fk: number;

  @Column({ nullable: true })
  res_c_failure: boolean;

  @Column({ nullable: true })
  res_c_damage: boolean;

  @Column({ type: 'varchar', nullable: true })
  res_c_clinicalcontext: string;

  @Column({ nullable: true })
  res_c_devicetype_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  res_c_otherdevicetype: string;

  @Column({ nullable: true })
  res_c_damagetype_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  res_c_otherdamagetype: string;

  @Column({ nullable: true })
  res_c_fluidtype_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  res_c_fluidname: string;

  @Column({ nullable: true })
  res_c_phlebitisgeneratingfluid: boolean;

  @Column({ type: 'float', nullable: true })
  res_c_fluidph: number;

  @Column({ nullable: true })
  res_c_adequateinfusiontime: boolean;

  @Column({ type: 'float', nullable: true })
  res_c_infusiontime: number;

  @Column({ nullable: true })
  res_c_adequatedilution: boolean;

  @Column({ type: 'varchar', nullable: true })
  res_c_fluiddilution: string;

  @Column({ type: 'varchar', nullable: true })
  res_c_otherinfluencingfactors: string;

  @Column({ type: 'varchar', nullable: true })
  res_c_otherfailedmeasures: string;

  @Column({ nullable: true })
  res_c_riskfactors_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  res_c_otherriskfactors: string;

  @Column({ type: 'varchar', nullable: true })
  res_c_venipuncturetechnique: string;

  @Column({ type: 'varchar', nullable: true })
  res_c_additionalfindings: string;

  @Column({ nullable: true })
  res_c_carefailures: boolean;

  @Column({ nullable: true })
  res_c_safetybarriers_id_fk: number;

  @Column({ nullable: true })
  res_c_incorrectactions: boolean;

  @Column({ nullable: true })
  res_c_unsafeactions: boolean;

  @Column({ type: 'varchar', nullable: true })
  res_c_conclusions: string;

  @Column({ nullable: true })
  res_c_casepreventable: boolean;

  @Column({ nullable: true })
  res_c_actionplan_id_fk: number;

  @Column({ nullable: true, default: true })
  res_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ClinicalResearchInfluencingFactor, (clinicalResearchInfluencingFactor) => clinicalResearchInfluencingFactor.clinicalResearch)
  clinicalResearchInfluencingFactor: ClinicalResearchInfluencingFactor[];

  @OneToMany(() => ClinicalResearchFailedMeasure, (clinicalResearchFailedMeasure) => clinicalResearchFailedMeasure.clinicalResearch)
  clinicalResearchFailedMeasure: ClinicalResearchFailedMeasure[];

  @OneToMany(() => ClinicalResearchCaseReportValidate, (clinicalResearchCaseReportValidate) => clinicalResearchCaseReportValidate.clinicalResearch)
  clinicalResearchCaseReportValidate: ClinicalResearchCaseReportValidate[];

  @ManyToOne(() => ResearchInstrument, (researchInstrument) => researchInstrument.clinicalResearch)
  @JoinColumn({ name: 'res_c_instrument_id_fk' })
  researchInstrument: ResearchInstrument;

  @ManyToOne(() => DeviceType, (deviceType) => deviceType.clinicalResearch)
  @JoinColumn({ name: 'res_c_devicetype_id_fk' })
  deviceType: DeviceType;

  @ManyToOne(() => DamageType, (damageType) => damageType.clinicalResearch)
  @JoinColumn({ name: 'res_c_damagetype_id_fk' })
  damageType: DamageType;

  @ManyToOne(() => FluidType, (fluidType) => fluidType.clinicalResearch)
  @JoinColumn({ name: 'res_c_fluidtype_id_fk' })
  fluidType: FluidType;

  @ManyToOne(() => RiskFactor, (riskFactor) => riskFactor.clinicalResearch)
  @JoinColumn({ name: 'res_c_riskfactors_id_fk' })
  riskFactor: RiskFactor;

  @ManyToOne(() => SafetyBarrier, (safetyBarrier) => safetyBarrier.clinicalResearch)
  @JoinColumn({ name: 'res_c_safetybarriers_id_fk' })
  safetyBarrier: SafetyBarrier;


  @ManyToOne(() => ActionPlan, (actionPlan) => actionPlan.clinicalResearch)
  @JoinColumn({ name: 'res_c_actionplan_id_fk' })
  actionPlan: ActionPlan;
}
