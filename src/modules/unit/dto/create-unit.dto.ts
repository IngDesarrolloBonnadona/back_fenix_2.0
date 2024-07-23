import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  // @IsNumber()
  // @IsNotEmpty()
  // unit_service_id_fk: number;

  @IsNotEmpty()
  @IsString()
  unit_name: string;

  @IsOptional()
  @IsString()
  unit_description: string;
}
