import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryCaseReportValidateDto {
  @IsString()
  @IsOptional()
  filingNumber: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  statusMovementId: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  caseTypeId: number;

  @IsString()
  @IsOptional()
  patientDoc: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  priorityId: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  eventTypeId: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  unitId: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  severityClasificationId: number;

  @IsString()
  @IsOptional()
  creationDate: string;
}
