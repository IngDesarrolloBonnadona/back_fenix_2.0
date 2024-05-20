import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriIncidentReportDto {

    // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_casetype_id_fk: number

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_reporter_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_origin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_suborigin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_patient_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_service_id_fk: number;
        
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_unit_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_severityclasif_id_fk: number; 
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_eventtype_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cir_event_id_fk: number;

    @IsNotEmpty()
    @IsString()
    ori_cir_description: string;

    @IsOptional()
    @IsString()
    ori_cir_inmediateaction: string;

}
