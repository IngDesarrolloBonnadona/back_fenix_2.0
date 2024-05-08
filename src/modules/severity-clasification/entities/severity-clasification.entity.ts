import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ClasificacionesSeveridad'})
export class SeverityClasification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    csev_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    csev_descripcion: string;

    @Column({ default: true })
    csev_estado: boolean;

    @CreateDateColumn()
    csev_fecha_creacion: Date;

    @UpdateDateColumn()
    csev_fecha_actualizacion: Date;

    @DeleteDateColumn()
    csev_fecha_eliminacion : Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.severityClasification)
    caseReportOriginal: CaseReportOriginal[];
}
