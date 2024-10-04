import { PartialType } from '@nestjs/mapped-types';
import { CreateSubOriginDto } from './create-sub-origin.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubOriginDto extends PartialType(CreateSubOriginDto) {
    @IsOptional()
    @IsBoolean()
    sub_o_status?: boolean
}
