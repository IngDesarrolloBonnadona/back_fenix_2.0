import { ActionPlanActivity } from 'src/modules/action-plan-activities/entities/action-plan-activity.entity';
import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_position' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pos_code_k: number;

  @Column({ type: 'varchar' })
  pos_name: string;

  @Column()
  pos_level: number;

  @Column({ type: 'boolean', default: true })
  pos_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.position,
  )
  reportAnalystAssignment: ReportAnalystAssignment[];

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.position)
  actionPlan: ActionPlan[];

  @OneToMany(
    () => ActionPlanActivity,
    (actionPlanActivity) => actionPlanActivity.position,
  )
  actionPlanActivity: ActionPlanActivity[];
}
