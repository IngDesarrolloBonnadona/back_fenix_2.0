import { PartialType } from '@nestjs/swagger';
import { CreateRoleResponseTimeDto } from './create-role-response-time.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRoleResponseTimeDto extends PartialType(
  CreateRoleResponseTimeDto,
) {
  @IsOptional()
  @IsBoolean()
  rest_c_status?: boolean;
}
