import { PartialType } from '@nestjs/swagger';
import { CreateDamageTypeDto } from './create-damage-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDamageTypeDto extends PartialType(CreateDamageTypeDto) {
    @IsOptional()
    @IsBoolean()
    dam_t_status?: boolean
}
