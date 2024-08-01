import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { Device } from 'src/modules/device-case-report/entities/device.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Medicine } from 'src/modules/medicine-case-report/entities/medicine.entity';
import { MovementReport } from 'src/modules/movement-report/entities/movement-report.entity';
import { Origin } from 'src/modules/origin/entities/origin.entity';
import { Priority } from 'src/modules/priority/entities/priority.entity';
import { RiskLevel } from 'src/modules/risk-level/entities/risk-level.entity';
import { RiskType } from 'src/modules/risk-type/entities/risk-type.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { SubOrigin } from 'src/modules/sub-origin/entities/sub-origin.entity';
import { Unit } from 'src/modules/unit/entities/unit.entity';
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

@Entity({ name: 'fenix_case_report_original' })
export class CaseReportOriginal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ori_cr_casetype_id_fk: number;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_filingnumber: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_documentpatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_doctypepatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_firstnamepatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_secondnamepatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_firstlastnamepatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_secondlastnamepatient: string;

  @Column({ nullable: true })
  ori_cr_agepatient: number;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_genderpatient: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_epspatient: string;

  @Column({ nullable: true })
  ori_cr_admconsecutivepatient: number;

  @Column({ nullable: true })
  ori_cr_reporter_id: number;

  @Column({ nullable: true })
  ori_cr_eventtype_id_fk: number;

  @Column({ nullable: true })
  ori_cr_service_id_fk: number;

  @Column({ nullable: true })
  ori_cr_event_id_fk: number;

  @Column({ nullable: true }) //
  ori_cr_risktype_id_fk: number;

  @Column({ nullable: true }) //
  ori_cr_severityclasif_id_fk: number;

  @Column({ nullable: true })
  ori_cr_origin_id_fk: number;

  @Column({ nullable: true })
  ori_cr_suborigin_id_fk: number;

  @Column({ nullable: true }) //
  ori_cr_risklevel_id_fk: number;

  @Column({ nullable: true })
  ori_cr_unit_id_fk: number;

  @Column({ nullable: true })
  ori_cr_priority_id_fk: number;

  @Column({ nullable: true })
  ori_cr_statusmovement_id_fk: number;

  @Column({ nullable: true })
  ori_cr_characterization_id_fk: number;

  @Column({ nullable: true })
  ori_cr_infoprovidedfamily: boolean;

  @Column({ nullable: true })
  ori_cr_clinicalfollowrequired: boolean;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_observationscharacterization: string;

  @Column({ type: 'varchar', nullable: true })
  ori_cr_description: string;

  @Column({ type: 'varchar', nullable: true }) //
  ori_cr_inmediateaction: string;

  @Column({ nullable: true }) //
  ori_cr_materializedrisk: boolean;

  @Column({ default: true }) //
  ori_cr_associatedpatient: boolean;

  @Column({ default: true })
  ori_cr_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.caseReportOriginal,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => Medicine, (medicine) => medicine.caseReportOriginal)
  medicine: Medicine[];

  @OneToMany(() => Device, (device) => device.caseReportOriginal)
  device: Device[];

  @ManyToOne(
    () => MovementReport,
    (movementReport) => movementReport.caseReportOriginal,
  )
  @JoinColumn({ name: 'ori_cr_statusmovement_id_fk' })
  movementReport: MovementReport;

  @ManyToOne(() => CaseType, (caseType) => caseType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_casetype_id_fk' })
  caseType: CaseType;

  @ManyToOne(() => RiskType, (riskType) => riskType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_risktype_id_fk' })
  riskType: RiskType;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.caseReportOriginal,
  )
  @JoinColumn({ name: 'ori_cr_severityclasif_id_fk' })
  severityClasification: SeverityClasification;

  @ManyToOne(() => Origin, (origin) => origin.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_origin_id_fk' })
  origin: Origin;

  @ManyToOne(() => SubOrigin, (subOrigin) => subOrigin.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_suborigin_id_fk' })
  subOrigin: SubOrigin;

  @ManyToOne(() => RiskLevel, (riskLevel) => riskLevel.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_risklevel_id_fk' })
  riskLevel: RiskLevel;

  @ManyToOne(() => EventType, (eventType) => eventType.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_eventtype_id_fk' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_event_id_fk' })
  event: Event;

  @ManyToOne(() => Service, (service) => service.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_service_id_fk' })
  service: Service;

  @ManyToOne(() => Unit, (unit) => unit.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_unit_id_fk' })
  unit: Unit;

  @ManyToOne(() => Priority, (priority) => priority.caseReportOriginal)
  @JoinColumn({ name: 'ori_cr_priority_id_fk' })
  priority: Priority;
}
