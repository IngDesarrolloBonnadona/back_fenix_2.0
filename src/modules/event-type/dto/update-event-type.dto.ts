import { PartialType } from '@nestjs/mapped-types';
import { CreateEventTypeDto } from './create-event-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEventTypeDto extends PartialType(CreateEventTypeDto) {
    @IsOptional()
    @IsBoolean()
    eve_t_status?: boolean
}
