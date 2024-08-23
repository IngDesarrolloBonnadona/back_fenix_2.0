import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReasonReturnCaseDto {
  @IsNotEmpty()
  @IsNumber()
  rec_r_role_id_fk: number;

  @IsNotEmpty()
  @IsString()
  rec_r_cause: string;

  @IsOptional()
  @IsString()
  rec_r_description: string;
}
