import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
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

@Entity({ name: 'fenix_service' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serv_unit_id_fk: number;

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

  @ManyToOne(() => Unit, (unit) => unit.service)
  @JoinColumn({ name: 'serv_unit_id_fk' })
  unit: Unit;

  // @OneToMany(() => Unit, (unit) => unit.service)
  // unit: Unit[];

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

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.service)
  actionPlan: ActionPlan[];
}
