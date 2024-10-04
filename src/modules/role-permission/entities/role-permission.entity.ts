import { ReasonReturnCase } from 'src/modules/reason-return-case/entities/reason-return-case.entity';
import { RoleResponseTime } from 'src/modules/role-response-time/entities/role-response-time.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  role_name: string;

  @Column({ type: 'varchar' })
  role_description: string;

  @Column({ default: true, type: 'boolean' })
  role_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => ReasonReturnCase,
    (reasonReturnCase) => reasonReturnCase.role,
  )
  reasonReturnCase: ReasonReturnCase[];

  @OneToMany(
    () => RoleResponseTime,
    (roleResponseTime) => roleResponseTime.role,
  )
  roleResponseTime: RoleResponseTime[];
}
