import { ObservationReturnCase } from 'src/modules/observation-return-case/entities/observation-return-case.entity';
import { Role } from 'src/modules/role/entities/role.entity';
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

@Entity()
export class ReasonReturnCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rec_r_role_id_fk: number;

  @Column({ type: 'varchar' })
  rec_r_cause: string;

  @Column({ type: 'varchar', nullable: true })
  rec_r_description: string;

  @Column({ type: 'boolean', default: true })
  rec_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.reasonReturnCase)
  @JoinColumn({ name: 'rec_r_role_id_fk' })
  role: Role;

  @OneToMany(
    () => ObservationReturnCase,
    (observationReturnCase) => observationReturnCase.reasonReturnCase,
  )
  observationReturnCase: ObservationReturnCase[];
}
