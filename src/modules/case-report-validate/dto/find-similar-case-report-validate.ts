import { IsNotEmpty, IsNumber } from "class-validator";

export class FindSimilarCaseReportValidateDto {
    @IsNumber()
    @IsNotEmpty()
    val_cr_patient_id_fk: number;

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