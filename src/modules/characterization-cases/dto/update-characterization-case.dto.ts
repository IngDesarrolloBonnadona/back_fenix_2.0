import { PartialType } from '@nestjs/swagger';
import { CreateCharacterizationCaseDto } from './create-characterization-case.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCharacterizationCaseDto extends PartialType(CreateCharacterizationCaseDto) {
    @IsOptional()
    @IsBoolean()
    cha_c_status?: boolean;
}
