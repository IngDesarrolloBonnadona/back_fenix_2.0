import { PartialType } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
    @IsOptional()
    @IsBoolean()
    pos_enabled?: boolean

    @IsOptional()
    @IsBoolean()
    pos_estatus?: boolean
}