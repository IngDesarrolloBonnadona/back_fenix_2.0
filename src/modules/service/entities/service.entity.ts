import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Unit } from 'src/modules/unit/entities/unit.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  serv_name: string;

  @Column({ type: 'varchar', nullable: true })
  serv_description: string;

  @Column({ default: true })
  serv_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Unit, (unit) => unit.service)
  unit: Unit[];

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.service,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.service,
  )
  caseReportValidate: CaseReportValidate[];
}
