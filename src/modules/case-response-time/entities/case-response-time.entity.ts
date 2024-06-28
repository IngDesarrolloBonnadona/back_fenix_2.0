import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
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

@Entity()
export class CaseResponseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rest_c_severityclasif_id_fk: number;

  @Column({ type: 'varchar' })
  rest_c_role: string;

  @Column({ type: 'varchar' })
  rest_c_description: string;

  @Column()
  rest_c_responsetime: number;

  @Column({ type: 'boolean', default: true })
  rest_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.caseResponseTime,
  )
  @JoinColumn({ name: 'rest_c_severityclasif_id_fk' })
  severityClasification: SeverityClasification;
}
