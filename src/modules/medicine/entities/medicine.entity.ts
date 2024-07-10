import { CaseReportOriginal } from 'src/modules/case-report-original/entities/case-report-original.entity';
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

@Entity({ name: 'fenix_medicine' })
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  med_case_id_fk: string;

  @Column()
  med_code: string;

  @Column({ type: 'varchar' })
  med_name: string;

  @Column({ type: 'varchar', nullable: true })
  med_description: string;

  @Column({ default: true })
  med_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => CaseReportOriginal,
    (caseReportOriginal) => caseReportOriginal.medicine,
  )
  @JoinColumn({ name: 'med_case_id_fk' })
  caseReportOriginal: CaseReportOriginal;
}
