import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { CaseType } from "src/modules/case-type/entities/case-type.entity";
import { Event } from "src/modules/event/entities/event.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EventType {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    eve_t_casetype_id_FK: number;
    
    @Column({ type: 'varchar' })
    eve_t_name: string;

    @Column({ type: 'varchar', nullable: true })
    eve_t_description: string;

    @Column({ default: true })
    eve_t_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Event, (event) => event.eventType)
    event: Event[];

    @ManyToOne(() => CaseType, (caseType) => caseType.eventType)
    @JoinColumn({ name: 'eve_t_casetype_id_FK'})
    caseType: CaseType

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.eventType)
    caseReportOriginal: CaseReportOriginal[];
}
