import { PartialType } from '@nestjs/swagger';
import { CreateDeviceTypeDto } from './create-device-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDeviceTypeDto extends PartialType(CreateDeviceTypeDto) {
    @IsOptional()
    @IsBoolean()
    dev_t_status?: boolean
}
