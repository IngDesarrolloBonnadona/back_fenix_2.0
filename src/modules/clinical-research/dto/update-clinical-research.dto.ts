import { PartialType } from '@nestjs/swagger';
import { CreateClinicalResearchDto } from './create-clinical-research.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClinicalResearchDto extends PartialType(CreateClinicalResearchDto) {
    // @IsOptional()
    // @IsBoolean()
    // res_c_status?: boolean
}
