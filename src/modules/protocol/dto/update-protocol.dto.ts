import { PartialType } from '@nestjs/swagger';
import { CreateProtocolDto } from './create-protocol.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProtocolDto extends PartialType(CreateProtocolDto) {
    @IsOptional()
    @IsBoolean()
    prot_status?: boolean
}
