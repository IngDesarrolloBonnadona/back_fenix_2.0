import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    unid_fecha_creacion: Date;

    @UpdateDateColumn()
    unid_fecha_actualizacion: Date;

    @DeleteDateColumn()
    unid_fecha_eliminacion: Date;

    @ManyToOne(() => Service, (service) => service.unit)
    @JoinColumn({ name: 'unid_id_servicio_FK'})
    service: Service

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.unit)
    caseReportOriginal: CaseReportOriginal[];
}
