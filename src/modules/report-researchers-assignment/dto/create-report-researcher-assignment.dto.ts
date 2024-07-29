import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReportResearcherAssignmentDto {
  @IsNotEmpty()
  @IsUUID()
  res_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsString()
  res_userresearch_id: string;
}
