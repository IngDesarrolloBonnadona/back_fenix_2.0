import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FindSimilarCaseReportValidateDto {
    @IsString()
    @IsOptional()
    val_cr_doctypepatient: string;

    @IsString()
    @IsOptional()
    val_cr_documentpatient: string;

    @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_eventtype_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_event_id_fk: number;
 
    @IsNumber()
    @IsNotEmpty()
    val_cr_reportingservice_id_fk: number;

}