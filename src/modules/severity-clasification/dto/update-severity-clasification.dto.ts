import { PartialType } from '@nestjs/mapped-types';
import { CreateSeverityClasificationDto } from './create-severity-clasification.dto';

export class UpdateSeverityClasificationDto extends PartialType(CreateSeverityClasificationDto) {}
