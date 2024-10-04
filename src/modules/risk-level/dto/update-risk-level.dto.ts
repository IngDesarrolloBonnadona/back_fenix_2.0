import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskLevelDto } from './create-risk-level.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskLevelDto extends PartialType(CreateRiskLevelDto) {
    @IsOptional()
    @IsBoolean()
    ris_l_status?: boolean
}
