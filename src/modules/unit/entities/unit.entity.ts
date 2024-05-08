import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Unidades'})
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unid_id_servicio_FK: number

    @Column({ type: 'varchar' })
    unid_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    unid_descripcion: string;

    @Column({ default: true })
    unid_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    unid_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    unid_fecha_actualizacion: Date;

    @ManyToOne(() => Service, (service) => service.unit)
    @JoinColumn({ name: 'unid_id_servicio_FK'})
    service: Service

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.unit)
    caseReportOriginal: CaseReportOriginal[];
}
