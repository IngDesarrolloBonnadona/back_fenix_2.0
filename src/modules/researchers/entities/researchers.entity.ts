import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Researcher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  res_documentresearcher: string;

  @Column()
  res_nameresearcher: string;

  @Column()
  res_lastnameresearcher: string;

  @Column()
  res_validatedcase_id_fk: string;

  @Column()
  res_analyst_id_fk: number;

  @Column()
  res_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
