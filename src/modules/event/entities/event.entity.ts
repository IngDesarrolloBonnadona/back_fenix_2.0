import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CharacterizationCase } from 'src/modules/characterization-cases/entities/characterization-case.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import { OncologyCategory } from 'src/modules/oncology-category/entities/oncology-category.entity';
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

@Entity({ name: 'fenix_event' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eve_eventtype_id_fk: number;

  @Column({ nullable: true })
  eve_unit_id_fk: number;

  @Column({ nullable: true })
  eve_oncologycategory_id_fk: number;

  @Column({ nullable: true })
  eve_characterizationcase_id_fk: number;

  @Column({ type: 'varchar' })
  eve_name: string;

  @Column({ default: true })
  eve_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => EventType, (eventType) => eventType.event)
  @JoinColumn({ name: 'eve_eventtype_id_fk' })
  eventType: EventType;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.event,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.event,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.event)
  actionPlan: ActionPlan[];

  @ManyToOne(() => Unit, (unit) => unit.event)
  @JoinColumn({ name: 'eve_unit_id_fk' })
  unit: Unit;

  @ManyToOne(() => OncologyCategory, (oncologyCategory) => oncologyCategory.event)
  @JoinColumn({ name: 'eve_oncologycategory_id_fk' })
  oncologyCategory: OncologyCategory;

  @ManyToOne(() => CharacterizationCase, (characterizationCase) => characterizationCase.event)
  @JoinColumn({ name: 'eve_characterizationcase_id_fk' })
  characterizationCase: CharacterizationCase;
}
