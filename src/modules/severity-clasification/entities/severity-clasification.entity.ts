import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    csev_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    csev_fecha_actualizacion: Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.severityClasification)
    caseReportOriginal: CaseReportOriginal[];
}
