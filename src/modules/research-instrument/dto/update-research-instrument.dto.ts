import { PartialType } from '@nestjs/swagger';
import { CreateResearchInstrumentDto } from './create-research-instrument.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateResearchInstrumentDto extends PartialType(CreateResearchInstrumentDto) {
    @IsOptional()
    @IsBoolean()
    inst_r_status?: boolean
}
