import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportAnalystAssignmentDto {
  @IsNotEmpty()
  @IsString()
  ana_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsNumber()
  ana_position_id_fk: number;

  @IsNotEmpty()
  @IsNumber()
  ana_useranalyst_id: number;

  @IsString()
  @IsOptional()
  ana_justifications: string;
}
