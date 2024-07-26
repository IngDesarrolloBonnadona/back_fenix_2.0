import { PartialType } from '@nestjs/swagger';
import { CreateClinicalResearchFailedMeasureDto } from './create-clinical-research-failed-measure.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClinicalResearchFailedMeasureDto extends PartialType(CreateClinicalResearchFailedMeasureDto) {
    @IsOptional()
    @IsBoolean()
    meas_fcr_status?: boolean
}
