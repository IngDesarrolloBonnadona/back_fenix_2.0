import { PartialType } from '@nestjs/swagger';
import { CreateSynergyDto } from './create-synergy.dto';

export class UpdateSynergyDto extends PartialType(CreateSynergyDto) {}
