import { PartialType } from '@nestjs/swagger';
import { CreateInfluencingFactorDto } from './create-influencing-factor.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInfluencingFactorDto extends PartialType(CreateInfluencingFactorDto) {
    @IsOptional()
    @IsBoolean()
    inf_f_status?: boolean
}
