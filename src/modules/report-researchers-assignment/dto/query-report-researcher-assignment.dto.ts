import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryReportResearchersAssignmentDto {
    @IsString()
    @IsOptional()
    filingNumber: string;

    @IsString()
    @IsOptional()
    patientDoc: string;
  
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
    statusMovementId: number;

    @IsString()
    @IsOptional()
    empImmediateBoss: string;

    @IsString()
    @IsOptional()
    empPosition: string;
}