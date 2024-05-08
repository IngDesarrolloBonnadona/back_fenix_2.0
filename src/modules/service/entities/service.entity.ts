import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Servicios'})
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    serv_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    serv_descripcion: string;

    @Column({ default: true })
    serv_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    serv_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    serv_fecha_actualizacion: Date;

    @OneToMany(() => Unit, (unit) => unit.service)
    unit: Unit[];

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.service)
    caseReportOriginal: CaseReportOriginal[];
}
