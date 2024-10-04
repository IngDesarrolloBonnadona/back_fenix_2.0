import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eve_eventtype_id_fk: number;

  @IsOptional()
  eve_unit_id_fk: number;

  @IsNotEmpty()
  @IsString()
  eve_name: string;

  @IsOptional()
  @IsString()
  eve_description: string;
}
