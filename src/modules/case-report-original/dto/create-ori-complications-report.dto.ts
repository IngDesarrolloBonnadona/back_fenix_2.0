import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriComplicationsReportDto {

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_casetype_id_fk: number

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_reporter_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_origin_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_suborigin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_service_id_fk: number;
      
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_unit_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_patient_id_fk: number;
   
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_severityclasif_id_fk: number; 
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_eventtype_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_event_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_ccr_risklevel_id_fk: number; 
  
    @IsNotEmpty()
    @IsString()
    ori_ccr_description: string;

    @IsOptional()
    @IsString()
    ori_ccr_inmediateaction: string;

}
