import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompressionConceptReportDto {
  @IsNotEmpty()
  @IsString()
  comp_c_user_id: string;

  @IsNotEmpty()
  @IsNumber()
  comp_c_casetype_id_fk: number;
}
