import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    tries_fecha_creacion: Date;

    @UpdateDateColumn()
    tries_fecha_actualizacion: Date;

    @DeleteDateColumn()
    tries_fecha_eliminacion: Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.riskType)
    caseReportOriginal: CaseReportOriginal[];
}
