import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CharacterizationCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  cha_c_name: string;

  @Column({ type: 'varchar', nullable: true })
  cha_c_description: string;

  @Column({ type: 'boolean', default: true })
  cha_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CaseReportValidate, (caseReportValidate) => caseReportValidate.characterizationCase)
    caseReportValidate: CaseReportValidate[];
}
