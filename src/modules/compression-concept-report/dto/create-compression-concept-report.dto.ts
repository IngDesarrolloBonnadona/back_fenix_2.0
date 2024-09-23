import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompressionConceptReportDto {
  @IsNotEmpty()
  @IsString()
  comp_c_user_id: string;

  @IsNotEmpty()
  @IsBoolean()
  comp_c_report_understood: boolean;
}
