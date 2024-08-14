import { ActionPlanActivity } from 'src/modules/action-plan-activities/entities/action-plan-activity.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Position } from 'src/modules/position/entities/position.entity';
import { Priority } from 'src/modules/priority/entities/priority.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Unit } from 'src/modules/unit/entities/unit.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_action_plan' })
export class ActionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  plan_a_name: string;

  @Column({ type: 'varchar', nullable: true })
  plan_a_description: string;

  @Column({ type: 'varchar' })
  plan_a_userresponsible_id: string;

  @Column({ type: 'varchar' })
  plan_a_nameresponsible: string;

  @Column()
  plan_a_position_id_fk: number;

  @Column()
  plan_a_casetype_id_fk: number;

  @Column()
  plan_a_eventtype_id_fk: number;

  @Column()
  plan_a_event_id_fk: number;

  @Column()
  plan_a_service_id_fk: number;

  @Column()
  plan_a_unit_id_fk: number;

  @Column()
  plan_a_priority_id_fk: number;

  @Column({ type: 'varchar' })
  plan_a_rootcause: string;

  @Column({ type: 'varchar' })
  plan_a_whydescription: string;

  @Column({ type: 'date' })
  plan_a_closingdate: Date;

  @Column({ default: true })
  plan_a_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ActionPlanActivity,
    (actionPlanActivity) => actionPlanActivity.actionPlan,
  )
  actionPlanActivity: ActionPlanActivity[];

  @ManyToOne(() => Position, (position) => position.actionPlan)
  @JoinColumn({ name: 'plan_a_position_id_fk' })
  position: Position;

  @ManyToOne(() => CaseType, (caseType) => caseType.actionPlan)
  @JoinColumn({ name: 'plan_a_casetype_id_fk' })
  caseType: CaseType;

  @ManyToOne(() => EventType, (eventType) => eventType.actionPlan)
  @JoinColumn({ name: 'plan_a_eventtype_id_fk' })
  eventType: EventType;

  @ManyToOne(() => Event, (event) => event.actionPlan)
  @JoinColumn({ name: 'plan_a_event_id_fk' })
  event: Event;

  @ManyToOne(() => Service, (service) => service.actionPlan)
  @JoinColumn({ name: 'plan_a_service_id_fk' })
  service: Service;

  @ManyToOne(() => Unit, (unit) => unit.actionPlan)
  @JoinColumn({ name: 'plan_a_unit_id_fk' })
  unit: Unit;

  @ManyToOne(() => Priority, (priority) => priority.actionPlan)
  @JoinColumn({ name: 'plan_a_priority_id_fk' })
  priority: Priority;

  @OneToMany(() => ClinicalResearch, (clinicalResearch) => clinicalResearch.actionPlan)
  clinicalResearch: ClinicalResearch[];
}
