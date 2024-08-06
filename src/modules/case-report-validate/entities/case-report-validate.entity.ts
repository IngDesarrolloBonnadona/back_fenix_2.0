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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Synergy } from 'src/modules/synergy/entities/synergy.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { RiskType } from 'src/modules/risk-type/entities/risk-type.entity';
import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { Origin } from 'src/modules/origin/entities/origin.entity';
import { SubOrigin } from 'src/modules/sub-origin/entities/sub-origin.entity';
import { RiskLevel } from 'src/modules/risk-level/entities/risk-level.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Unit } from 'src/modules/unit/entities/unit.entity';
import { ReportResearcherAssignment } from 'src/modules/report-researchers-assignment/entities/report-researchers-assignment.entity';
import { Priority } from 'src/modules/priority/entities/priority.entity';
import { MovementReport } from 'src/modules/movement-report/entities/movement-report.entity';
import { CharacterizationCase } from 'src/modules/characterization-cases/entities/characterization-case.entity';
import { ObservationReturnCase } from 'src/modules/observation-return-case/entities/observation-return-case.entity';
import { ClinicalResearchCaseReportValidate } from 'src/modules/clinical-research-case-report-validate/entities/clinical-research-case-report-validate.entity';

@Entity({ name: 'fenix_case_report_validate' })
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
  val_cr_reporter_id: number;

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

  @Column({ nullable: true })
  val_cr_priority_id_fk: number;

  @Column({ nullable: true })
  val_cr_statusmovement_id_fk: number;

  @Column({ nullable: true })
  val_cr_characterization_id_fk: number;

  @Column({ nullable: true })
  val_cr_infoprovidedfamily: boolean;

  @Column({ nullable: true })
  val_cr_clinicalfollowrequired: boolean;

  @Column({ type: 'varchar', nullable: true })
  val_cr_observationscharacterization: string;

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

  @ManyToOne(() => RiskLevel, (riskLevel) => riskLevel.caseReportValidate)
  @JoinColumn({ name: 'val_cr_risklevel_id_fk' })
  riskLevel: RiskLevel;

  @ManyToOne(() => EventType, (eventType) => eventType.caseReportValidate)
  @JoinColumn({ name: 'val_cr_eventtype_id_fk' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.caseReportValidate)
  @JoinColumn({ name: 'val_cr_event_id_fk' })
  event: Event;

  @ManyToOne(() => Service, (service) => service.caseReportValidate)
  @JoinColumn({ name: 'val_cr_service_id_fk' })
  service: Service;

  @ManyToOne(() => Unit, (unit) => unit.caseReportValidate)
  @JoinColumn({ name: 'val_cr_unit_id_fk' })
  unit: Unit;

  @ManyToOne(() => Priority, (priority) => priority.caseReportValidate)
  @JoinColumn({ name: 'val_cr_priority_id_fk' })
  priority: Priority;

  @ManyToOne(
    () => MovementReport,
    (movementReport) => movementReport.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_statusmovement_id_fk' })
  movementReport: MovementReport;

  @ManyToOne(
    () => CharacterizationCase,
    (characterizationCase) => characterizationCase.caseReportValidate,
  )
  @JoinColumn({ name: 'val_cr_characterization_id_fk' })
  characterizationCase: CharacterizationCase;

  @OneToMany(() => Log, (log) => log.caseReportValidate)
  log: Log[];

  @OneToMany(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.caseReportValidate,
  )
  reportAnalystAssignment: ReportAnalystAssignment[];

  @OneToMany(() => Synergy, (synergy) => synergy.caseReportValidate)
  synergy: Synergy[];

  @OneToMany(
    () => ReportResearcherAssignment,
    (reportResearcherAssignment) =>
      reportResearcherAssignment.caseReportValidate,
  )
  reportResearcherAssignment: ReportResearcherAssignment[];

  @OneToMany(
    () => ObservationReturnCase,
    (observationReturnCase) => observationReturnCase.caseReportValidate,
  )
  observationReturnCase: ObservationReturnCase[];

  @OneToMany(
    () => ClinicalResearchCaseReportValidate,
    (clinicalResearchCaseReportValidate) =>
      clinicalResearchCaseReportValidate.caseReportValidate,
  )
  clinicalResearchCaseReportValidate: ClinicalResearchCaseReportValidate[];
}
