import { PartialType } from '@nestjs/swagger';
import { CreateRiskFactorDto } from './create-risk-factor.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRiskFactorDto extends PartialType(CreateRiskFactorDto) {
    @IsOptional()
    @IsBoolean()
    ris_f_status?: boolean
}
