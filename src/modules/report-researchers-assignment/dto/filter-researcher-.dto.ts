import { IsString } from 'class-validator';

export class FilterReportResearcherAssignmentDto {
  @IsString()
  empImmediateBoss: string;

  @IsString()
  empPosition: string;

  // @IsNumber()
  // empStatus: number;
}
