import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Unit } from "src/modules/unit/entities/unit.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    serv_fecha_creacion: Date;

    @UpdateDateColumn()
    serv_fecha_actualizacion: Date;

    @DeleteDateColumn()
    serv_fecha_eliminacion: Date

    @OneToMany(() => Unit, (unit) => unit.service)
    unit: Unit[];

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.service)
    caseReportOriginal: CaseReportOriginal[];
}
