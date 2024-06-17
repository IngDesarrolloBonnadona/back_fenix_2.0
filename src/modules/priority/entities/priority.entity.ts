import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Priority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prior_name: string;

  @Column()
  prior_description: string;

  @Column()
  prior_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
