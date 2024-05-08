import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Origin } from "src/modules/origin/entities/origin.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'SubFuentes'})
export class SubOrigin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sfu_id_fuente_FK: number

    @Column({ type: 'varchar' })
    sfu_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    sfu_descripcion: string;

    @Column({ default: true })
    sfu_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    sfu_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    sfu_fecha_actualizacion: Date;
    
    @ManyToOne(() => Origin, (origin) => origin.subOrigins)
    @JoinColumn({ name: 'sfu_id_fuente_FK'})
    origin: Origin

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.subOrigin)
    caseReportOriginal: CaseReportOriginal[];
}
