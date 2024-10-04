import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Position } from 'src/modules/position/entities/position.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_report_analyst_assignment' })
export class ReportAnalystAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  ana_validatedcase_id_fk: string;

  @Column()
  ana_position_id_fk: number;

  @Column({ type: 'varchar' })
  ana_useranalyst_id: string;

  @Column({ type: 'varchar' })
  ana_uservalidator_id: string;

  @Column()
  ana_days: number;

  @Column({ default: 0 })
  ana_amountreturns: number;

  @Column({ default: false })
  ana_isreturned: boolean;

  @Column({ nullable: true })
  ana_justifications: string;

  @Column({ default: true })
  ana_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Position, (position) => position.reportAnalystAssignment)
  @JoinColumn({ name: 'ana_position_id_fk' })
  position: Position;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.reportAnalystAssignment,
  )
  @JoinColumn({ name: 'ana_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
