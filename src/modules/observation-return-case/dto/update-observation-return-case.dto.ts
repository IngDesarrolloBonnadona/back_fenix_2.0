import { PartialType } from '@nestjs/swagger';
import { CreateObservationReturnCaseDto } from './create-observation-return-case.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateObservationReturnCaseDto extends PartialType(CreateObservationReturnCaseDto) {
    @IsOptional()
    @IsBoolean()
    rec_o_status?: boolean
}
