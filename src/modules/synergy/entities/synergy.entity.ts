import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
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

@Entity({ name: 'fenix_synergy' })
export class Synergy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  syn_validatedcase_id_fk: string;

  // @Column({ type: 'varchar' })
  // syn_patient_id: String;

  // @Column({ type: 'varchar' })
  // syn_patientname: String;  // Quien es el paciente

  // @Column()
  // syn_patientage: number; //edad

  // @Column({ type: 'varchar' })
  // syn_patientmedicalhistory: String;  //antecedentes

  // @Column({ type: 'varchar' })
  // syn_patientcomorbidity: String; //comorbilidad 

  // @Column()
  // syn_proceduredate: Date;  // Fecha de procedimiento

  // @Column({ type: 'varchar' })
  // syn_preliminaryCauses: String;  // Causas preliminares que dieron origen al caso

  // @Column({ type: 'varchar' })
  // syn_patientImpact: String;  // Impacto en el paciente

  // @Column({ type: 'varchar' })
  // syn_currentTreatmentAndFamilyStatus: String;   // Que le están haciendo actualmente y como está la familia y si hay molestias de parte de ellos

  // @Column({ default: false })
  // syn_clinicalStaffNotified: boolean; // Evaluar que el personal clínico se le haya notificado por mensaje y al jefe de la especialidad

  @Column()
  syn_evaluationdate: Date;

  @Column({ nullable: true })
  syn_resolutiondate: Date;

  @Column({ default: false })
  syn_status: boolean;

  // @Column()
  // syn_programmingcounter: number;

  // @Column({ nullable: true })
  // syn_reschedulingdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.synergy,
  )
  @JoinColumn({ name: 'syn_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
