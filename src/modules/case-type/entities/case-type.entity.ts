import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CompressionConceptReport } from 'src/modules/compression-concept-report/entities/compression-concept-report.entity';
import { EventType } from 'src/modules/event-type/entities/event-type.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_case_type' })
export class CaseType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  cas_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  cas_t_description: string;

  @Column({ type: 'varchar', nullable: true })
  cas_t_image: string;

  @Column({ type: 'boolean', default: true })
  cas_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => EventType, (eventType) => eventType.caseType)
  eventType: EventType[];

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.caseType,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.caseType,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.caseType)
  actionPlan: ActionPlan[];

  @OneToMany(
    () => CompressionConceptReport,
    (compressionConceptReport) => compressionConceptReport.caseType,
  )
  compressionConceptReport: CompressionConceptReport[];
}
