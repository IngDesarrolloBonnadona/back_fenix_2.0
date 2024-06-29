import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleResponseTimeDto {
  @IsNotEmpty()
  @IsNumber()
  rest_r_severityclasif_id_fk: number;

  @IsNotEmpty()
  @IsNumber()
  rest_r_role_id_fk: number;

  @IsNotEmpty()
  @IsNumber()
  rest_r_responsetime: number;

  @IsOptional()
  @IsString()
  rest_r_description: string;
}
