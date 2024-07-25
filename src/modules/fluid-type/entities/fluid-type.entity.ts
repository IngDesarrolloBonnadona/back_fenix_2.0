import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_fluid_type' })
export class FluidType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  flu_t_name: string;

  @Column({ type: 'varchar', nullable: true })
  flu_t_description: string;

  @Column({ default: true })
  flu_t_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
