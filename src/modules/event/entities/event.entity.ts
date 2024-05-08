import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { EventType } from "src/modules/event-type/entities/event-type.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Sucesos'})
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    suc_id_tipo_suceso_FK: number;

    @Column({ type: 'varchar' })
    suc_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    suc_descripcion: string;

    @Column({ default: true })
    suc_estado: boolean;

    @CreateDateColumn()
    suc_fecha_creacion: Date;

    @UpdateDateColumn()
    suc_fecha_actualizacion: Date;

    @DeleteDateColumn()
    suc_fecha_eliminacion: Date;

    @ManyToOne(() => EventType, (eventType) => eventType.event)
    @JoinColumn({ name: 'suc_id_tipo_suceso_FK'})
    eventType: EventType

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.event)
    caseReportOriginal: CaseReportOriginal[];
}
