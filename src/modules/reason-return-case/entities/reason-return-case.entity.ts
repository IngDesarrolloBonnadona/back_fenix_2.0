import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ReasonReturnCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  rec_r_actor: string;

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
}
