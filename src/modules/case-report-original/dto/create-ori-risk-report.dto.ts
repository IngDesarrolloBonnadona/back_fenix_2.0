import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriRiskReportDto {
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_casetype_id_fk: number

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_reporter_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_origin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_suborigin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_service_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_unit_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_patient_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_eventtype_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_crr_event_id_fk: number;
    
    // // @IsNumber()
    // @IsOptional()
    // ori_crr_risktype_id_fk: number; 

    @IsNotEmpty()
    @IsString()
    ori_crr_description: string;

    @IsBoolean()
    @IsNotEmpty()
    ori_crr_materializedrisk: boolean;

    @IsBoolean()
    @IsNotEmpty()
    ori_crr_associatedpatient: boolean;
}
