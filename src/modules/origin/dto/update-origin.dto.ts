import { PartialType } from '@nestjs/mapped-types';
import { CreateOriginDto } from './create-origin.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOriginDto extends PartialType(CreateOriginDto) {
    @IsOptional()
    @IsBoolean()
    orig_status?: boolean
}
