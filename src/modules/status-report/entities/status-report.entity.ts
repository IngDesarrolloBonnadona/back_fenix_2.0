import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { MovementReport } from "src/modules/movement-report/entities/movement-report.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class StatusReport {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'uuid' })
    sta_r_originalcase_id_fk: string;
    
    @Column()
    sta_r_movement_id_fk: number;

    @Column({ default: true })
    erep_estado: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => MovementReport, (movementReport) => movementReport.statusReport)
    @JoinColumn({ name: 'sta_r_movement_id_fk'})
    movementReport: MovementReport

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.statusReport)
    @JoinColumn({ name: 'sta_r_originalcase_id_fk'})
    caseReportOriginal: CaseReportOriginal
}
