import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { RoleResponseTime } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { Priority } from 'src/modules/priority/entities/priority.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_severity_clasification' })
export class SeverityClasification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  sev_c_name: string;

  @Column({ type: 'varchar', nullable: true })
  sev_c_description: string;

  @Column({ default: true })
  sev_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.severityClasification,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.severityClasification,
  )
  caseReportValidate: CaseReportValidate[];

  @OneToMany(
    () => RoleResponseTime,
    (roleResponseTime) => roleResponseTime.severityClasification,
  )
  roleResponseTime: RoleResponseTime[];

  @OneToOne(() => Priority, (priority) => priority.severityClasification)
  priority: Priority;
}
