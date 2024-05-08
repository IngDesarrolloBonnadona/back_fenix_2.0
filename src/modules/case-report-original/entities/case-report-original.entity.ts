import { CaseReportValidate } from "src/modules/case-report-validate/entities/case-report-validate.entity";
import { CaseType } from "src/modules/case-type/entities/case-type.entity";
import { Device } from "src/modules/device/entities/device.entity";
import { EventType } from "src/modules/event-type/entities/event-type.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { Medicine } from "src/modules/medicine/entities/medicine.entity";
import { Origin } from "src/modules/origin/entities/origin.entity";
import { RiskLevel } from "src/modules/risk-level/entities/risk-level.entity";
import { RiskType } from "src/modules/risk-type/entities/risk-type.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { SeverityClasification } from "src/modules/severity-clasification/entities/severity-clasification.entity";
import { StatusReport } from "src/modules/status-report/entities/status-report.entity";
import { SubOrigin } from "src/modules/sub-origin/entities/sub-origin.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ReportesCasoOriginal'})
export class CaseReportOriginal {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rcori_id_tipocaso_FK: number

    @Column()
    rcori_id_paciente_FK: number;
    
    @Column()
    rcori_id_reportante_FK: number;

    @Column()
    rcori_id_tipo_suceso_FK: number;

    @Column()
    rcori_id_servicio_FK: number;

    @Column()
    rcori_id_suceso_FK: number;

    @Column({ nullable: true })
    rcori_id_tipo_riesgo_FK: number;
    
    @Column({ nullable: true })
    rcori_id_clasif_severidad_FK: number;
    
    @Column()
    rcori_id_fuente_FK: number;
    
    @Column()
    rcori_id_subfuente_FK: number;
    
    @Column({ nullable: true })
    rcori_id_nivel_riesgo_FK: number;

    @Column()
    rcori_id_unidad_FK: number;
    
    @Column({ type: 'varchar', nullable: true })
    rcori_descripcion: string;
    
    @Column({ type: 'varchar', nullable: true })
    rcori_acc_inmediatas: string;
    
    @Column({ nullable: true })
    rcori_ries_materializado: boolean;
    
    @Column({ nullable: true })
    rcori_pac_asociado: boolean;
    
    @Column({ default: true })
    rcori_estado: boolean;

    @CreateDateColumn()
    rcori_fecha_creacion: Date;
    
    @UpdateDateColumn()
    rcori_fecha_actualizacion: Date;

    @DeleteDateColumn()
    rcori_fecha_eliminacion: Date

    @OneToMany(() => CaseReportValidate, (caseReportValidate) => caseReportValidate.caseReportOriginal)
    caseReportValidate: CaseReportValidate[]

    @OneToMany(() => Medicine, (medicine) => medicine.caseReportOriginal)
    medicine: Medicine[]

    @OneToMany(() => Device, (device) => device.caseReportOriginal)
    device: Device[]

    @OneToMany(() => StatusReport, (statusReport) => statusReport.caseReportOriginal)
    statusReport: StatusReport[]

    @ManyToOne(() => CaseType, (caseType) => caseType.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_tipocaso_FK'})
    caseType: CaseType

    @ManyToOne(() => RiskType, (riskType) => riskType.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_tipo_riesgo_FK'})
    riskType: RiskType

    @ManyToOne(() => SeverityClasification, (severityClasification) => severityClasification.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_clasif_severidad_FK'})
    severityClasification: SeverityClasification

    @ManyToOne(() => Origin, (origin) => origin.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_fuente_FK'})
    origin: Origin

    @ManyToOne(() => SubOrigin, (subOrigin) => subOrigin.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_subfuente_FK'})
    subOrigin: SubOrigin

    @ManyToOne(() => RiskLevel, (riskLevel) => riskLevel.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_nivel_riesgo_FK'})
    riskLevel: RiskLevel

    @ManyToOne(() => EventType, (eventType) => eventType.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_tipo_suceso_FK'})
    eventType: EventType

    @ManyToOne(() => Event, (event) => event.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_suceso_FK'})
    event: Event

    @ManyToOne(() => Service, (service) => service.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_servicio_FK'})
    service: Service

    @ManyToOne(() => Unit, (unit) => unit.caseReportOriginal)
    @JoinColumn({ name: 'rcori_id_unidad_FK'})
    unit: Unit
}
