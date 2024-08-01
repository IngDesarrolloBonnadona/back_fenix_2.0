import { PartialType } from '@nestjs/swagger';
import { CreateClinicalResearchInfluencingFactorDto } from './create-clinical-research-influencing-factor.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClinicalResearchInfluencingFactorDto extends PartialType(CreateClinicalResearchInfluencingFactorDto) {
    @IsOptional()
    @IsBoolean()
    inf_fcr_status?: boolean
}
