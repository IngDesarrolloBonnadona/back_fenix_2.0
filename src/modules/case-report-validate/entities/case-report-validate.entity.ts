import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Log } from "src/modules/log/entities/log.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CaseReportValidate {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    val_cr_consecutive_id: number

    @Column({ nullable: true })
    val_cr_previous_id: number
    
    @Column({ type: 'uuid', nullable: true })
    val_cr_originalcase_id_fk: string

    @Column({ nullable: true })
    val_cr_casetype_id_fk: number
    
    @Column({ type: 'varchar', nullable: true })
    val_cr_filingnumber: string
    
    @Column({ nullable: true })
    val_cr_patient_id_fk: number;
    
    @Column({ nullable: true })
    val_cr_reporter_id_fk: number;
    
    @Column({ nullable: true })
    val_cr_eventtype_id_fk: number;

    @Column({ nullable: true })
    val_cr_service_id_fk: number;

    @Column({ nullable: true })
    val_cr_event_id_fk: number;

    @Column({ nullable: true }) //
    val_cr_risktype_id_fk: number;
    
    @Column({ nullable: true }) //
    val_cr_severityclasif_id_fk: number;
    
    @Column({ nullable: true })
    val_cr_origin_id_fk: number;
    
    @Column({ nullable: true })
    val_cr_suborigin_id_fk: number;
    
    @Column({ nullable: true }) //
    val_cr_risklevel_id_fk: number;

    @Column({ nullable: true })
    val_cr_unit_id_fk: number;
    
    @Column({ type: 'varchar', nullable: true }) //
    val_cr_description: string;
    
    @Column({ type: 'varchar', nullable: true }) //
    val_cr_inmediateaction: string;
    
    @Column({ nullable: true }) //
    val_cr_materializedrisk: boolean;
    
    @Column({ nullable: true }) //
    val_cr_associatedpatient: boolean;
    
    @Column({ default: false })
    val_cr_validated: boolean;

    @Column({ default: true })
    val_cr_status: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.caseReportValidate)
    @JoinColumn({name: "val_cr_originalcase_id_fk"})
    caseReportOriginal: CaseReportOriginal

    @OneToMany(() => Log, (log) => log.caseReportValidate)
    log: Log[]
}   
