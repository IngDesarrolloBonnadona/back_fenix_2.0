import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";

export class CreateLogDto {
    // @IsNumber()
    @IsNotEmpty()
    log_validatedcase_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    log_user_id_fk: number;

    @IsString()
    @IsNotEmpty()
    log_action: string;

    @IsString()
    @IsNotEmpty()
    log_ip: string;
}
