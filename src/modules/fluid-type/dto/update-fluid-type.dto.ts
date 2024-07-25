import { PartialType } from '@nestjs/swagger';
import { CreateFluidTypeDto } from './create-fluid-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFluidTypeDto extends PartialType(CreateFluidTypeDto) {
    @IsOptional()
    @IsBoolean()
    flu_t_status?: boolean
}
