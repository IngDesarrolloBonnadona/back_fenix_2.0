import { StatusReport } from "src/modules/status-report/entities/status-report.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MovimientosReporte'})
export class MovementReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    mrep_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    mrep_descripcion: string;

    @Column()
    mrep_tiempo: number;

    @Column({ default: true })
    mrep_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    mrep_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    mrep_fecha_actualizacion: Date;

    @OneToMany(() => StatusReport, (statusReport) => statusReport.movementReport)
    statusReport: StatusReport[];
}
