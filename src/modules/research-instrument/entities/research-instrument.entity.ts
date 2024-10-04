import { ClinicalResearch } from 'src/modules/clinical-research/entities/clinical-research.entity';
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'fenix_research_instrument' })
export class ResearchInstrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  inst_r_name: string;

  @Column({ type: 'varchar', nullable: true })
  inst_r_description: string;

  @Column({ default: true })
  inst_r_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ClinicalResearch, (clinicalResearch) => clinicalResearch.researchInstrument)
  clinicalResearch: ClinicalResearch[];
}
