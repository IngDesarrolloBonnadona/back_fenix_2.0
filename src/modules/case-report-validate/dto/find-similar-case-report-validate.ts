import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindSimilarCaseReportValidateDto {
    @IsString()
    @IsNotEmpty()
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
    val_cr_unit_id_fk: number;

}