import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Medicamentos'})
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    med_id_caso_FK: number

    @Column()
    med_codigo: number

    @Column({ type: 'varchar' })
    med_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    med_descripcion: string;

    @Column({ default: true })
    med_estado: boolean;

    @CreateDateColumn()
    med_fecha_creacion: Date;

    @UpdateDateColumn()
    med_fecha_actualizacion: Date;

    @DeleteDateColumn()
    med_fecha_eliminacion: Date

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.medicine)
    @JoinColumn({ name: 'med_id_caso_FK'})
    caseReportOriginal: CaseReportOriginal
}
