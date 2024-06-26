import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementReportDto } from './create-movement-report.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMovementReportDto extends PartialType(CreateMovementReportDto) {
    @IsOptional()
    @IsBoolean()
    mov_r_status?: boolean
}
