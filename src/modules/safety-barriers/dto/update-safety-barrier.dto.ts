import { PartialType } from '@nestjs/swagger';
import { CreateSafetyBarrierDto } from './create-safety-barrier.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSafetyBarrierDto extends PartialType(CreateSafetyBarrierDto) {
    @IsOptional()
    @IsBoolean()
    saf_b_status?: boolean
}
