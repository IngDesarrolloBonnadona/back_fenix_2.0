import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ActionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  plan_a_name: string;

  @Column({ type: 'varchar', nullable: true })
  plan_a_description: string;

  @Column({ type: 'varchar' })
  plan_a_userresponsible_id_fk: string;

  @Column()
  plan_a_casetype_id_fk: number;

  @Column()
  plan_a_eventtype_id_fk: number;

  @Column()
  plan_a_event_id_fk: number;

  @Column({ type: 'uuid' })
  plan_a_validatedcase_id_fk: string;

  @Column()
  plan_a_service_id_fk: number;

  @Column()
  plan_a_unit: number;

  @Column()
  plan_a_priority_id_fk: number;

  @Column({ type: 'varchar' })
  plan_a_rootcause: string;

  @Column({ type: 'varchar' })
  plan_a_whydescription: string;

  @Column({ default: true })
  plan_a_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
