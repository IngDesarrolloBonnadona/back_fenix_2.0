import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
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

@Entity()
export class Synergy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  syn_validatedcase_id_fk: string;

  @Column()
  syn_reschedulingdate: Date;

  @Column()
  syn_evaluationdate: Date;

  @Column()
  syn_resolutiondate: Date;

  @Column({ default: false })
  syn_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.synergy,
  )
  @JoinColumn({ name: 'syn_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}