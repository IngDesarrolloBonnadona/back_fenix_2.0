import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
    @IsOptional()
    @IsBoolean()
    dev_status?: boolean;
}
