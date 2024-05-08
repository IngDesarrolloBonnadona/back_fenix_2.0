import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'NivelesRiesgo'})
export class RiskLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    nries_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    nries_descripcion: string;

    @Column({ default: true })
    nries_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    nries_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    nries_fecha_actualizacion: Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.riskLevel)
    caseReportOriginal: CaseReportOriginal[];
}
