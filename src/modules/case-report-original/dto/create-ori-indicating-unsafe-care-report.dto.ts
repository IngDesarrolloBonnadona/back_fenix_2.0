import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriIndicatingUnsafeCareReportDto {

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_casetype_id_fk: number

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_reporter_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_origin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_suborigin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_patient_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_service_id_fk: number;
        
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_unit_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_severityclasif_id_fk: number; 
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_eventtype_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_cur_event_id_fk: number;

    @IsNotEmpty()
    @IsString()
    ori_cur_description: string;

    @IsOptional()
    @IsString()
    ori_cur_inmediateaction: string;

}
