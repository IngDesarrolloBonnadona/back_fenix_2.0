import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Logs'})
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    log_id_caso_validado_FK: number;

    @Column()
    log_id_usuario_FK: number;

    @Column()
    log_accion: string;

    @Column()
    log_ip: string;

    @Column({ default: true })
    log_estado: boolean;

    @CreateDateColumn()
    log_fecha_creacion: Date;

    @UpdateDateColumn()
    log_fecha_actualizacion: Date;

    @DeleteDateColumn()
    log_fecha_eliminacion: Date;
}
