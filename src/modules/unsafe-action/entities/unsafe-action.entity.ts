import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fenix_unsafe_action' })
export class UnsafeAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  uns_a_name: string;

  @Column({ type: 'varchar', nullable: true })
  uns_a_description: string;

  @Column({ default: true })
  uns_a_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
