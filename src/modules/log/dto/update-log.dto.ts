import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-log.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateLogDto extends PartialType(CreateLogDto) {
    @IsOptional()
    @IsBoolean()
    log_status?: boolean
}
