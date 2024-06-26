import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseTypeDto } from './create-case-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCaseTypeDto extends PartialType(CreateCaseTypeDto) {
    @IsOptional()
    @IsBoolean()
    cas_t_status?: boolean
}
