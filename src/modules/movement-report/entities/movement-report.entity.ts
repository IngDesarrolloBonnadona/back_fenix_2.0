import { StatusReport } from "src/modules/status-report/entities/status-report.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MovementReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    mov_r_name: string;

    @Column({ type: 'varchar', nullable: true })
    mov_r_description: string;

    @Column()
    mov_r_time: number;

    @Column({ default: true })
    mov_r_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => StatusReport, (statusReport) => statusReport.movementReport)
    statusReport: StatusReport[];
}
