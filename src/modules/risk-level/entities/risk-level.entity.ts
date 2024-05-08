import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    nries_fecha_creacion: Date;

    @UpdateDateColumn()
    nries_fecha_actualizacion: Date;

    @DeleteDateColumn()
    nries_fecha_eliminacion : Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.riskLevel)
    caseReportOriginal: CaseReportOriginal[];
}
