import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportAnalystAssignmentDto {
  @IsNotEmpty()
  @IsString()
  ass_ra_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsNumber()
  ass_ra_position_id_fk: number;

  @IsNotEmpty()
  @IsNumber()
  ass_ra_useranalyst_id: number;

  // @IsNotEmpty()
  // @IsNumber()
  // ass_ra_uservalidator_id: number;
}
