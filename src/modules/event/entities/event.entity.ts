import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
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

  @Column({ type: 'varchar' })
  eve_name: string;

  @Column({ type: 'varchar', nullable: true })
  eve_description: string;

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
}
