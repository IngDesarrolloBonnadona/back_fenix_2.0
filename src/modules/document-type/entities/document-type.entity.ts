import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fenix_document_type' })
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  doc_t_code: string;

  @Column({ type: 'varchar' })
  doc_t_name: string;

  @Column({ default: true })
  doc_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
