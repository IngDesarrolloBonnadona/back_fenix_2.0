import { PartialType } from '@nestjs/mapped-types';
import { CreateMovementReportDto } from './create-movement-report.dto';

export class UpdateMovementReportDto extends PartialType(CreateMovementReportDto) {}
