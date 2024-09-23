import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fenix_comprenssion_concept_report' })
export class CompressionConceptReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  comp_c_user_id: string;

  @Column({ type: 'boolean' })
  comp_c_report_understood: boolean;

  @Column({ type: 'boolean', default: true })
  comp_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
