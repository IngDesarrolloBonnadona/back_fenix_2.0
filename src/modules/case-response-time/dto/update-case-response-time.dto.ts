import { PartialType } from '@nestjs/swagger';
import { CreateCaseResponseTimeDto } from './create-case-response-time.dto';

export class UpdateCaseResponseTimeDto extends PartialType(CreateCaseResponseTimeDto) {}
