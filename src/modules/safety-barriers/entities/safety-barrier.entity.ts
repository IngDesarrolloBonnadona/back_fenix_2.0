import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fenix_safety_barrier' })
export class SafetyBarrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  saf_b_name: string;

  @Column({ type: 'varchar', nullable: true })
  saf_b_description: string;

  @Column({ default: true })
  saf_b_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
