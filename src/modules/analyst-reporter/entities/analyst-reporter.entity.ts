import { CaseReportValidate } from "src/modules/case-report-validate/entities/case-report-validate.entity";
import { Position } from "src/modules/position/entities/position.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AnalystReporter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ana_r_validatedcase_id_fk: string;

    @Column()
    ana_r_position_id_fk: number;

    @Column()
    ana_r_user_id_fk: number;

    @Column()
    ana_r_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => CaseReportValidate, (caseReportValidate) => caseReportValidate.analystReporter)
    @JoinColumn({ name: "ana_r_validatedcase_id_fk" })
    caseReportValidate: CaseReportValidate

    @ManyToOne(() => Position, (position) => position.analystReporter)
    @JoinColumn({ name: "ana_r_position_id_fk" })
    position: Position
}
