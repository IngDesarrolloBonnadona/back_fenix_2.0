import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportAnalystAssignmentDto {
  @IsNotEmpty()
  @IsString()
  ass_ra_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsNumber()
  ass_ra_position_id_fk: number;

  @IsNotEmpty()
  @IsNumber()
  ass_ra_user_id_fk: number;
}
