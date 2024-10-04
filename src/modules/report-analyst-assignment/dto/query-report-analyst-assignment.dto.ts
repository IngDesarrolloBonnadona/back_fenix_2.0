import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryReportAnalystAssignmentDto {
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

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    eventId: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    priorityId: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    positionId: number;
}