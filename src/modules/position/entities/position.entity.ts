import { AnalystReporter } from "src/modules/analyst-reporter/entities/analyst-reporter.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    pos_name: string

    @Column({ type: 'boolean', default: true })
    pos_enabled: boolean

    @Column({ type: 'boolean', default: true })
    pos_status: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => AnalystReporter, (analystReporter) => analystReporter.position)
    analystReporter: AnalystReporter[]
}
