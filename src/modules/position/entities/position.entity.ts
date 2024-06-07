import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
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
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pos_code_k: number;

  @Column({ type: 'varchar' })
  pos_name: string;

  @Column()
  pos_level: number;

  @Column({ type: 'boolean', default: true })
  pos_enabled: boolean;

  @Column({ type: 'boolean', default: true })
  pos_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ReportAnalystAssignment,
    (reportAnalystAssignment) => reportAnalystAssignment.position,
  )
  reportAnalystAssignment: ReportAnalystAssignment[];
}
