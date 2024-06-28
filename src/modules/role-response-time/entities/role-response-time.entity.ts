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
export class RoleResponseTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rest_r_severityclasif_id_fk: number;

  @Column({ type: 'varchar' })
  rest_r_role: string;

  @Column({ type: 'varchar' })
  rest_r_description: string;

  @Column()
  rest_r_responsetime: number;

  @Column({ type: 'boolean', default: true })
  rest_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => SeverityClasification,
    (severityClasification) => severityClasification.roleResponseTime,
  )
  @JoinColumn({ name: 'rest_r_severityclasif_id_fk' })
  severityClasification: SeverityClasification;
}
