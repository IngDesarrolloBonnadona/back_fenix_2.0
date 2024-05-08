import { CaseReportOriginal } from "src/modules/case-report-original/entities/case-report-original.entity";
import { SubOrigin } from "src/modules/sub-origin/entities/sub-origin.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Fuentes'})
export class Origin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    fu_nombre: string;

    @Column({ type: 'varchar', nullable: true })
    fu_descripcion: string;

    @Column({ default: true })
    fu_estado: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    fu_fecha_creacion: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    fu_fecha_actualizacion: Date;
    
    @OneToMany(() => SubOrigin, (subOrigin) => subOrigin.origin)
    subOrigins: SubOrigin[];

    @OneToMany(() => CaseReportOriginal, (caseReportOriginal) => caseReportOriginal.origin)
    caseReportOriginal: CaseReportOriginal[];
}
