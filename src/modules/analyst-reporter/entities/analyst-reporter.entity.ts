import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AnalystReporter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ana_r_validatedcase_id_fk: string;

    @Column()
    ana_r_position_id_fk: number;

    @Column()
    ana_r_user_id_fk: number;

    @Column()
    ana_r_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    
}
