import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ReportesCasoValidado'})
export class CaseReportValidate {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    rcval_id_caso_original_FK: number
    
    @Column()
    rcval_id_tipocaso_FK: number
    
    @Column()
    rcval_id_paciente_FK: number;
    
    @Column()
    rcval_id_reportante_FK: number;
    
    @Column()
    rcval_id_tipo_suceso_FK: number;

    @Column()
    rcval_id_servicio_FK: number;

    @Column()
    rcval_id_suceso_FK: number;

    @Column({ nullable: true })
    rcval_id_tipo_riesgo_FK: number;
    
    @Column({ nullable: true })
    rcval_id_clasif_severidad_FK: number;
    
    @Column()
    rcval_id_fuente_FK: number;
    
    @Column()
    rcval_id_subfuente_FK: number;
    
    @Column({ nullable: true })
    rcval_id_nivel_riesgo_FK: number;

    @Column()
    rcval_id_unidad_FK: number;
    
    @Column({ type: 'varchar', nullable: true })
    rcval_descripcion: string;
    
    @Column({ type: 'varchar', nullable: true })
    rcval_acc_inmediatas: string;
    
    @Column({ nullable: true })
    rcval_ries_materializado: boolean;
    
    @Column({ nullable: true })
    rcval_pac_asociado: boolean;
    
    @Column({ default: false })
    rcval_validado: boolean;

    @Column({ default: true })
    rcval_estado: boolean;

    @CreateDateColumn()
    rcval_fecha_creacion: Date;
    
    @UpdateDateColumn()
    rcval_fecha_actualizacion: Date;

    @DeleteDateColumn()
    rcval_fecha_eliminacion: Date;

    @ManyToOne(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.caseReportValidate)
    @JoinColumn({name: "rcval_id_caso_original_FK"})
    caseReportOriginal: CaseReportOriginal
}   
