import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { EventType } from "src/modules/event-type/entities/event-type.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TiposCaso'})
export class CaseType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    tcas_nombre: string;

    @Column({ type: 'text', nullable: true })
    tcas_descripcion: string;

    @Column({ type: 'boolean', default: true })
    tcas_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    tcas_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    tcas_fecha_actualizacion: Date;

    @OneToMany(() => EventType, (eventType) => eventType.caseType)
    eventType: EventType[];

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.caseType)
    caseReportOriginal: CaseReportOriginal[];
}
