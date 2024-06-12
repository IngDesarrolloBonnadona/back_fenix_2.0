import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { Log } from 'src/modules/log/entities/log.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Synergy } from 'src/modules/synergy/entities/synergy.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { RiskType } from 'src/modules/risk-type/entities/risk-type.entity';
import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { Origin } from 'src/modules/origin/entities/origin.entity';
import { SubOrigin } from 'src/modules/sub-origin/entities/sub-origin.entity';

@Entity()
export class CaseReportValidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  val_cr_consecutive_id: number;

  @Column({ nullable: true })
  val_cr_previous_id: number;

  @Column({ type: 'uuid', nullable: true })
  val_cr_originalcase_id_fk: string;

  @Column({ nullable: true })
  val_cr_casetype_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  val_cr_filingnumber: string;

  @Column({ nullable: true })
  val_cr_documentpatient: string;

  @Column({ nullable: true })
  val_cr_doctypepatient: string;

  @Column({ nullable: true })
  val_cr_firstnamepatient: string;

  @Column({ nullable: true })
  val_cr_secondnamepatient: string;

  @Column({ nullable: true })
  val_cr_firstlastnamepatient: string;

  @Column({ nullable: true })
  val_cr_secondlastnamepatient: string;

  @Column({ nullable: true })
  val_cr_agepatient: number;

  @Column({ nullable: true })
  val_cr_genderpatient: string;

  @Column({ nullable: true })
  val_cr_epspatient: string;

  @Column({ nullable: true })
  val_cr_admconsecutivepatient: number;

  @Column({ nullable: true })
  val_cr_reporter_id_fk: number;

  @Column({ nullable: true })
  val_cr_eventtype_id_fk: number;

  @Column({ nullable: true })
  val_cr_service_id_fk: number;

  @Column({ nullable: true })
  val_cr_event_id_fk: number;

  @Column({ nullable: true }) //
  val_cr_risktype_id_fk: number;

  @Column({ nullable: true }) //
  val_cr_severityclasif_id_fk: number;

  @Column({ nullable: true })
  val_cr_origin_id_fk: number;

  @Column({ nullable: true })
  val_cr_suborigin_id_fk: number;

  @Column({ nullable: true }) //
  val_cr_risklevel_id_fk: number;

  @Column({ nullable: true })
  val_cr_unit_id_fk: number;

  @Column({ type: 'varchar', nullable: true }) //
  val_cr_description: string;

  @Column({ type: 'varchar', nullable: true }) //
  val_cr_inmediateaction: string;

  @Column({ nullable: true }) //
  val_cr_materializedrisk: boolean;

  @Column({ default: true }) //
  val_cr_associatedpatient: boolean;

  @Column({ default: false })
  val_cr_validated: boolean;

  @Column({ default: true })
  val_cr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_originalcase_id_fk' })
  caseReportOriginal: CaseReportOriginal;

  @ManyToOne(() => CaseType, (caseType) => caseType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_casetype_id_fk' })
  caseType: CaseType;

  @ManyToOne(() => RiskType, (riskType) => riskType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_risktype_id_fk' })
  riskType: RiskType;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_severityclasif_id_fk' })
  severityClasification: SeverityClasification;

  @ManyToOne(() => Origin, (origin) => origin.caseReportValidate)
  @JoinColumn({ name: 'val_cr_origin_id_fk' })
  origin: Origin;

  @ManyToOne(() => SubOrigin, (subOrigin) => subOrigin.caseReportValidate)
  @JoinColumn({ name: 'val_cr_suborigin_id_fk' })
  subOrigin: SubOrigin;

  @OneToMany(() => Log, (log) => log.caseReportValidate)
  log: Log[];

  @OneToMany(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.caseReportValidate,
  )
  reportAnalystAssignment: ReportAnalystAssignment[];

  @OneToMany(() => Synergy, (synergy) => synergy.caseReportValidate)
  synergy: Synergy[];
}
