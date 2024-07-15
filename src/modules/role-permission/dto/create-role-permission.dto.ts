import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRolePermissionDto {
  @IsString()
  @IsNotEmpty()
  role_name: string;

  @IsString()
  @IsOptional()
  role_description: string;
}
