import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'fenix_risk_factor' })
export class RiskFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  ris_f_name: string;

  @Column({ type: 'varchar', nullable: true })
  ris_f_description: string;

  @Column({ default: true })
  ris_f_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ClinicalResearch, (clinicalResearch) => clinicalResearch.riskFactor)
  clinicalResearch: ClinicalResearch[];
}
