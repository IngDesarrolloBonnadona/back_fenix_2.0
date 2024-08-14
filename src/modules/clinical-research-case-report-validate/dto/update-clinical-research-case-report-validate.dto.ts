import { PartialType } from '@nestjs/swagger';
import { CreateClinicalResearchCaseReportValidateDto } from './create-clinical-research-case-report-validate.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClinicalResearchCaseReportValidateDto extends PartialType(CreateClinicalResearchCaseReportValidateDto) {
    @IsOptional()
    @IsBoolean()
    res_crv_status?: boolean;
}
