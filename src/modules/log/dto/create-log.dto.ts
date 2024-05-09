export class CreateLogDto {
    log_id_caso_validado_FK: number;
    log_id_usuario_FK: number;
    log_accion: string;
    log_ip: string;
    log_estado: boolean;
}
