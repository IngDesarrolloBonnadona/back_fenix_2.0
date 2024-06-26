import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskTypeDto } from './create-risk-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskTypeDto extends PartialType(CreateRiskTypeDto) {
    @IsOptional()
    @IsBoolean()
    ris_t_status?: boolean;
}
