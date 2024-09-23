import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
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

@Entity({ name: 'fenix_comprenssion_concept_report' })
export class CompressionConceptReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  comp_c_user_id: string;

  @Column({})
  comp_c_casetype_id_fk: number;

  @Column({ type: 'boolean', default: true })
  comp_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => CaseType, (caseType) => caseType.compressionConceptReport)
  @JoinColumn({ name: 'comp_c_casetype_id_fk' })
  caseType: CaseType;
}
