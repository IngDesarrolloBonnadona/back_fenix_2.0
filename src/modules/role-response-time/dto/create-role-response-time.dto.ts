import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleResponseTimeDto {
  @IsNotEmpty()
  @IsNumber()
  rest_c_severityclasif_id_fk: number;

  @IsNotEmpty()
  @IsString()
  rest_c_role: string;

  @IsNotEmpty()
  @IsNumber()
  rest_c_responsetime: number;

  @IsOptional()
  @IsString()
  rest_c_description: string;
}
