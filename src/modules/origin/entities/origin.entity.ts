import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { SubOrigin } from "src/modules/sub-origin/entities/sub-origin.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Origin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    orig_name: string;

    @Column({ type: 'varchar', nullable: true })
    orig_description: string;

    @Column({ default: true })
    orig_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
    
    @OneToMany(() => SubOrigin, (subOrigin) => subOrigin.origin)
    subOrigins: SubOrigin[];

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.origin)
    caseReportOriginal: CaseReportOriginal[];
}
