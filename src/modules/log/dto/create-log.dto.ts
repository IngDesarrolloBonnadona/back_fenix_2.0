export class CreateLogDto {
    log_validatedcase_id_fk: number;
    log_user_id_fk: number;
    log_action: string;
    log_ip: string;
    log_status: boolean;
}
