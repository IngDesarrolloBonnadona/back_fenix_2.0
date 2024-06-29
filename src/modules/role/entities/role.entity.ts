import { ReasonReturnCase } from 'src/modules/reason-return-case/entities/reason-return-case.entity';
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
export class Role {
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

  @OneToMany(() => ReasonReturnCase, (reasonReturnCase) => reasonReturnCase.role)
  reasonReturnCase: ReasonReturnCase[];

  
}
