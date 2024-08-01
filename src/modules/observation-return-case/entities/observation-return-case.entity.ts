import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { ReasonReturnCase } from 'src/modules/reason-return-case/entities/reason-return-case.entity';
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

@Entity({ name: 'fenix_observation_return_case' })
export class ObservationReturnCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rec_o_reasonreturn_id_fk: number;

  @Column({ type: 'uuid' })
  rec_o_validatedcase_id_fk: string;

  @Column()
  rec_o_user_id: number;

  @Column({ type: 'varchar' })
  rec_o_observation: string;

  @Column({ type: 'boolean', default: true })
  rec_o_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => ReasonReturnCase,
    (reasonReturnCase) => reasonReturnCase.observationReturnCase,
  )
  @JoinColumn({ name: 'rec_o_reasonreturn_id_fk' })
  reasonReturnCase: ReasonReturnCase;

  @ManyToOne(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.observationReturnCase,
  )
  @JoinColumn({ name: 'rec_o_validatedcase_id_fk' })
  caseReportValidate: CaseReportValidate;
}
