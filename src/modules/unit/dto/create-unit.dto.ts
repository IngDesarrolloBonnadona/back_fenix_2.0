import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  unit_name: string;

  @IsOptional()
  @IsString()
  unit_description: string;
}
