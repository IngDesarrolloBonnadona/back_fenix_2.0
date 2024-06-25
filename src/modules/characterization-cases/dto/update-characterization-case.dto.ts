import { PartialType } from '@nestjs/swagger';
import { CreateCharacterizationCaseDto } from './create-characterization-case.dto';

export class UpdateCharacterizationCaseDto extends PartialType(CreateCharacterizationCaseDto) {}
