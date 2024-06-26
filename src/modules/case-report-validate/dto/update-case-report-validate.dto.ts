import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseReportValidateDto } from './create-case-report-validate.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCaseReportValidateDto extends PartialType(CreateCaseReportValidateDto) {
    @IsOptional()
    @IsBoolean()
    val_cr_status?: boolean
}
