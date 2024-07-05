import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportResearcherAssignmentDto {
  @IsNotEmpty()
  @IsString()
  res_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsNumber()
  res_userresearch_id: number;
}
