import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Origin } from 'src/modules/origin/entities/origin.entity';
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

@Entity({ name: 'fenix_sub_origin' })
export class SubOrigin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sub_o_origin_id_fk: number;

  @Column({ type: 'varchar' })
  sub_o_name: string;

  @Column({ type: 'varchar', nullable: true })
  sub_o_description: string;

  @Column({ default: true })
  sub_o_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Origin, (origin) => origin.subOrigins)
  @JoinColumn({ name: 'sub_o_origin_id_fk' })
  origin: Origin;

  @OneToMany(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.subOrigin,
  )
  caseReportOriginal: CaseReportOriginal[];

  @OneToMany(
    () => CaseReportValidate,
    (caseReportValidate) => caseReportValidate.subOrigin,
  )
  caseReportValidate: CaseReportValidate[];
}
