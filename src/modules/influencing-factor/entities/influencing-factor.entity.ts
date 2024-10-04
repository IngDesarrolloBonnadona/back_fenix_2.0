import { ClinicalResearchInfluencingFactor } from 'src/modules/clinical-research-influencing-factor/entities/clinical-research-influencing-factor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_influencing_factor' })
export class InfluencingFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  inf_f_name: string;

  @Column({ type: 'varchar', nullable: true })
  inf_f_description: string;

  @Column({ default: true })
  inf_f_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ClinicalResearchInfluencingFactor, (clinicalResearchInfluencingFactor) => clinicalResearchInfluencingFactor.influencingFactor)
  clinicalResearchInfluencingFactor: ClinicalResearchInfluencingFactor[];
}
