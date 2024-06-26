import { PartialType } from '@nestjs/mapped-types';
import { CreateSeverityClasificationDto } from './create-severity-clasification.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSeverityClasificationDto extends PartialType(CreateSeverityClasificationDto) {
    @IsOptional()
    @IsBoolean()
    sev_c_status?: boolean
}

