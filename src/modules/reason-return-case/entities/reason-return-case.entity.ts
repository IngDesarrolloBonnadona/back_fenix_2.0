import { ObservationReturnCase } from 'src/modules/observation-return-case/entities/observation-return-case.entity';
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity';
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

@Entity({ name: 'fenix_reason_return_case' })
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

  @ManyToOne(() => RolePermission, (role) => role.reasonReturnCase)
  @JoinColumn({ name: 'rec_r_role_id_fk' })
  role: RolePermission;

  @OneToMany(
    () => ObservationReturnCase,
    (observationReturnCase) => observationReturnCase.reasonReturnCase,
  )
  observationReturnCase: ObservationReturnCase[];
}
