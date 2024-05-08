import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Dispositivos'})
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    disp_id_caso_FK: number

    @Column()
    disp_codigo: number

    @Column({ type: 'varchar' })
    disp_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    disp_descripcion: string;

    @Column({ default: true })
    disp_estado: boolean;

    @CreateDateColumn()
    disp_fecha_creacion: Date;

    @UpdateDateColumn()
    disp_fecha_actualizacion: Date;

    @DeleteDateColumn({ nullable: true })
    disp_fecha_eliminacion: Date

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.device)
    @JoinColumn({ name: 'disp_id_caso_FK'})
    caseReportOriginal: CaseReportOriginal
}
