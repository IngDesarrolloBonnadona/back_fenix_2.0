import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_movement_report' })
export class MovementReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  mov_r_name: string;

  @Column({ type: 'varchar', nullable: true })
  mov_r_description: string;

  @Column()
  mov_r_time: number;

  @Column({ default: true })
  mov_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.movementReport,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.movementReport,
  )
  caseReportValidate: CaseReportValidate[];
}
