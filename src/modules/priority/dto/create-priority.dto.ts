import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriorityDto {
  @IsString()
  @IsNotEmpty()
  prior_name: string;

  @IsNumber()
  @IsNotEmpty()
  prior_severityclasif_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  prior_responsetime: number;
}
