import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskTypeDto } from './create-risk-type.dto';

export class UpdateRiskTypeDto extends PartialType(CreateRiskTypeDto) {}
