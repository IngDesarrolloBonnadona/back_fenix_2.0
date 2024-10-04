import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
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

@Entity({ name: 'fenix_action_plan_activities'})
export class ActionPlanActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plan_aa_actionplan_id_fk: number;

  @Column({ type: 'varchar' })
  plan_aa_nameincharge: string;

  @Column({ type: 'varchar' })
  plan_aa_userincharge_id: string;

  @Column()
  plan_aa_position_id_fk: number;

  @Column({ type: 'date' })
  plan_aa_executiondate: Date;

  @Column({ type: 'varchar' })
  plan_aa_descriptionactivity: string;

  @Column({ type: 'varchar' })
  plan_aa_implementationplan: string;

  @Column({ default: true })
  plan_aa_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ActionPlan,
    (actionPlan) => actionPlan.actionPlanActivity,
  )
  @JoinColumn({ name: 'plan_aa_actionplan_id_fk' })
  actionPlan: ActionPlan;

  @ManyToOne(() => Position, (position) => position.actionPlanActivity)
  @JoinColumn({ name: 'plan_aa_position_id_fk' })
  position: Position;
}
