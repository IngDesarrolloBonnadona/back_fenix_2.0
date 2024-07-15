import { PartialType } from '@nestjs/swagger';
import { CreateRolePermissionDto } from './create-role-permission.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRolePermissionDto extends PartialType(
  CreateRolePermissionDto,
) {
  @IsBoolean()
  @IsOptional()
  role_status?: boolean;
}
