import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Position } from 'src/modules/position/entities/position.entity';
import { Researcher } from 'src/modules/researchers/entities/researchers.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  ass_ra_useranalyst_id: number;

  @Column()
  ass_ra_uservalidator_id: number;

  @Column()
  ass_ra_days: number;

  @Column({ default: 0 })
  ass_ra_amountreturns: number;

  @Column({ default: false })
  ass_ra_isreturned: boolean

  @Column({ nullable: true })
  ass_ra_justifications: string;

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
