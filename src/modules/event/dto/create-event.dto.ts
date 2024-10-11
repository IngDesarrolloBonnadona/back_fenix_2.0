import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  eve_eventtype_id_fk: number;

  @IsNumber()
  @IsOptional()
  eve_unit_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  eve_oncologycategory_id_fk: number;

  @IsNumber()
  @IsOptional()
  eve_characterizationcase_id_fk: number;

  @IsNotEmpty()
  @IsString()
  eve_name: string;
}
