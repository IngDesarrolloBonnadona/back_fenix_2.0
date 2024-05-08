import { StatusReport } from "src/modules/status-report/entities/status-report.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    mrep_fecha_creacion: Date;

    @UpdateDateColumn()
    mrep_fecha_actualizacion: Date;

    @DeleteDateColumn()
    mrep_fecha_eliminacion: Date;

    @OneToMany(() => StatusReport, (statusReport) => statusReport.movementReport)
    statusReport: StatusReport[];
}
