import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReportResearcherAssignmentDto {
  @IsNotEmpty()
  @IsUUID()
  res_validatedcase_id_fk: string;

  @IsNotEmpty()
  @IsNumber()
  res_userresearch_id: number;
}
