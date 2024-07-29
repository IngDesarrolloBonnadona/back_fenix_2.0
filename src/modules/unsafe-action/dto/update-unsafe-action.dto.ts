import { PartialType } from '@nestjs/swagger';
import { CreateUnsafeActionDto } from './create-unsafe-action.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUnsafeActionDto extends PartialType(CreateUnsafeActionDto) {
  @IsOptional()
  @IsBoolean()
  uns_a_status?: boolean;
}
