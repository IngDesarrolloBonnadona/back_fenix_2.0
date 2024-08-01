import { PartialType } from '@nestjs/swagger';
import { CreateFailedMeasureDto } from './create-failed-measure.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFailedMeasureDto extends PartialType(CreateFailedMeasureDto) {
    @IsOptional()
    @IsBoolean()
    meas_f_status?: boolean
}
