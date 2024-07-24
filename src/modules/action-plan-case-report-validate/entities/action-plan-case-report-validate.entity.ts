import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
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

@Entity({ name: 'fenix_action_plan_case_report_validate'})
export class ActionPlanCaseReportValidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  plan_av_validatedcase_id_fk: string;

  @Column()
  plan_av_actionplan_id_fk: number;

  @Column({ default: true })
  plan_av_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(
    () => ActionPlan,
    (actionPlan) => actionPlan.actionPlanCaseReportValidate,
  )
  @JoinColumn({ name: 'plan_av_actionplan_id_fk' })
  actionPlan: ActionPlan;

  @OneToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.actionPlanCaseReportValidate,
  )
  @JoinColumn({ name: 'plan_av_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
