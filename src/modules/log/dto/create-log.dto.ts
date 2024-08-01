import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateLogDto {
  @IsUUID()
  @IsNotEmpty()
  log_validatedcase_id_fk: string;

  @IsString()
  @IsNotEmpty()
  log_user_id: string;

  @IsString()
  @IsNotEmpty()
  log_action: string;

  @IsString()
  @IsNotEmpty()
  log_ip: string;
}
