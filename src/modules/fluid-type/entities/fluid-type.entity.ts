import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => ClinicalResearch, (clinicalResearch) => clinicalResearch.fluidType)
  clinicalResearch: ClinicalResearch[];
}
