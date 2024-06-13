import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateLogDto {
  @IsUUID()
  @IsNotEmpty()
  log_validatedcase_id_fk: string;

  @IsNumber()
  @IsNotEmpty()
  log_user_id: number;

  @IsString()
  @IsNotEmpty()
  log_action: string;

  @IsString()
  @IsNotEmpty()
  log_ip: string;
}
