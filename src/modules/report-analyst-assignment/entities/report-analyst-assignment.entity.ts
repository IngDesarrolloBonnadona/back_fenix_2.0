import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Position } from 'src/modules/position/entities/position.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReportAnalystAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ass_ra_validatedcase_id_fk: string;

  @Column()
  ass_ra_position_id_fk: number;

  @Column()
  ass_ra_documentanalyst: number;

  @Column({ default: true })
  ass_ra_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Position, (position) => position.reportAnalystAssignment)
  @JoinColumn({ name: 'ass_ra_position_id_fk' })
  position: Position;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.reportAnalystAssignment,
  )
  @JoinColumn({ name: 'ass_ra_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
