import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity({ name: 'fenix_clinical_research' })
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

  @Column({ type: 'float', nullable: true })
  res_c_fluiddilution: number;

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
  res_c_incorrectupdates: boolean;

  @Column({ nullable: true })
  res_c_unsafeactions: boolean;

  @Column({ type: 'varchar', nullable: true })
  res_c_conclusions: string;

  @Column({ nullable: true })
  res_c_casepreventable: boolean;

  @Column({ nullable: true, default: true })
  res_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
