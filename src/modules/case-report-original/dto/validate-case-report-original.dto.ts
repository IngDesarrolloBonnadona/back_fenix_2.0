import { IsNotEmpty, IsNumber, } from "class-validator";

export class ValidateCaseReportOriginalDto {
    @IsNumber()
    @IsNotEmpty()
    ori_cr_patient_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    ori_cr_eventtype_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_event_id_fk: number;
 
    @IsNumber()
    @IsNotEmpty()
    ori_cr_unit_id_fk: number;
}
