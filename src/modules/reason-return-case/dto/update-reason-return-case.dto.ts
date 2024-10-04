import { PartialType } from '@nestjs/swagger';
import { CreateReasonReturnCaseDto } from './create-reason-return-case.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReasonReturnCaseDto extends PartialType(
  CreateReasonReturnCaseDto,
) {
  @IsOptional()
  @IsBoolean()
  rec_r_status?: boolean;
}
