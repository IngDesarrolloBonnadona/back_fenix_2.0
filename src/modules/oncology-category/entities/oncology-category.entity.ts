import { Event } from 'src/modules/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_oncology_category' })
export class OncologyCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  onc_c_name: string;

  @Column({ type: 'varchar', nullable: true })
  onc_c_description: string;

  @Column({ default: true })
  onc_c_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Event, (event) => event.oncologyCategory)
  event: Event[];
}
