import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_priority' })
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prior_severityclasif_id_fk: number;

  @Column()
  prior_name: string;

  @Column({ nullable: true })
  prior_description: string;

  @Column()
  prior_responsetime: number;

  @Column({ default: true })
  prior_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.priority,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.priority,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.priority,
  )
  @JoinColumn({ name: 'prior_severityclasif_id_fk' })
  severityClasification: SeverityClasification;

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.priority)
  actionPlan: ActionPlan[];
}
