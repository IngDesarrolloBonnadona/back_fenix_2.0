import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SeverityClasification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    sev_c_name: string;

    @Column({ type: 'varchar', nullable: true })
    sev_c_description: string;

    @Column({ default: true })
    sev_c_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt : Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.severityClasification)
    caseReportOriginal: CaseReportOriginal[];
}
