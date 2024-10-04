import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseReportOriginalDto } from './create-case-report-original.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCaseReportOriginalDto extends PartialType(CreateCaseReportOriginalDto) {
    @IsOptional()
    @IsBoolean()
    ori_cr_status?: boolean
}
