import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Service } from "src/modules/service/entities/service.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit_service_id_FK: number

    @Column({ type: 'varchar' })
    unit_name: string;

    @Column({ type: 'varchar', nullable: true })
    unit_description: string;

    @Column({ default: true })
    unit_status: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Service, (service) => service.unit)
    @JoinColumn({ name: 'unit_service_id_FK'})
    service: Service

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.unit)
    caseReportOriginal: CaseReportOriginal[];
}
