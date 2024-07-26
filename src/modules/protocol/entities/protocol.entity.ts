import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'fenix_protocol' })
export class Protocol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  prot_name: string;

  @Column({ nullable: true })
  prot_description: string;

  @Column({ default: true })
  prot_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
