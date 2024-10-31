import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsNumber()
  @IsNotEmpty()
  eve_t_casetype_id_fk: number;

  // @IsNumber()
  // @IsNotEmpty()
  // eve_t_oncologycategory_id_fk: number;

  // @IsNumber()
  // @IsNotEmpty()
  // eve_t_characterizationcase_id_fk: number;

  @IsNotEmpty()
  @IsString()
  eve_t_name: string;
}
