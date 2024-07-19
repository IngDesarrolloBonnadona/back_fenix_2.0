import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { Event } from 'src/modules/event/entities/event.entity';
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

@Entity({ name: 'fenix_event_type' })
export class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eve_t_casetype_id_fk: number;

  @Column({ type: 'varchar' })
  eve_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  eve_t_description: string;

  @Column({ default: true })
  eve_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Event, (event) => event.eventType)
  event: Event[];

  @ManyToOne(() => CaseType, (caseType) => caseType.eventType)
  @JoinColumn({ name: 'eve_t_casetype_id_fk' })
  caseType: CaseType;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.eventType,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.eventType,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.eventType)
  actionPlan: ActionPlan[];
}
