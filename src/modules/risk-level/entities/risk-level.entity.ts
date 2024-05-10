import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RiskLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    ris_l_name: string;

    @Column({ type: 'varchar', nullable: true })
    ris_l_description: string;

    @Column({ default: true })
    ris_l_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt : Date;

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.riskLevel)
    caseReportOriginal: CaseReportOriginal[];
}
