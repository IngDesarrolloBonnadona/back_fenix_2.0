import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TiposRiesgo'})
export class RiskType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    tries_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    tries_descripcion: string;

    @Column({ default: true })
    tries_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    tries_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    tries_fecha_actualizacion: Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.riskType)
    caseReportOriginal: CaseReportOriginal[];
}
