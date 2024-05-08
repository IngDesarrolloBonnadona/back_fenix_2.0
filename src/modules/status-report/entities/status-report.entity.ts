import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { MovementReport } from "src/modules/movement-report/entities/movement-report.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'EstadosReporte' })
export class StatusReport {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    erep_id_caso_original_FK: number;
    
    @Column()
    erep_id_movimiento_reporte_FK: number;

    @Column({ type: 'varchar', nullable: true })
    erep_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    erep_descripcion: string;

    @Column({ default: true })
    erep_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    erep_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    erep_fecha_actualizacion: Date;

    @ManyToOne(() => MovementReport, (movementReport) => movementReport.statusReport)
    @JoinColumn({ name: 'erep_id_movimiento_reporte_FK'})
    movementReport: MovementReport

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.statusReport)
    @JoinColumn({ name: 'erep_id_caso_original_FK'})
    caseReportOriginal: CaseReportOriginal
}
