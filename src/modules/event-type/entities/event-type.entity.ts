import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { CaseType } from "src/modules/case-type/entities/case-type.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'TiposSuceso'})
export class EventType {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    tsuc_id_tipo_caso_FK: number;
    
    @Column({ type: 'varchar' })
    tsuc_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    tsuc_descripcion: string;

    @Column({ default: true })
    tsuc_estado: boolean;

    @CreateDateColumn()
    tsuc_fecha_creacion: Date;

    @UpdateDateColumn()
    tsuc_fecha_actualizacion: Date;

    @DeleteDateColumn()
    tsuc_fecha_eliminacion: Date;

    @OneToMany(() => Event, (event) => event.eventType)
    event: Event[];

    @ManyToOne(() => CaseType, (caseType) => caseType.eventType)
    @JoinColumn({ name: 'tsuc_id_tipo_caso_FK'})
    caseType: CaseType

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.eventType)
    caseReportOriginal: CaseReportOriginal[];
}
