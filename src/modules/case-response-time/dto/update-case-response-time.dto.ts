import { PartialType } from '@nestjs/swagger';
import { CreateCaseResponseTimeDto } from './create-case-response-time.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCaseResponseTimeDto extends PartialType(CreateCaseResponseTimeDto) {
    @IsOptional()
    @IsBoolean()
    rest_c_status?: boolean
}
