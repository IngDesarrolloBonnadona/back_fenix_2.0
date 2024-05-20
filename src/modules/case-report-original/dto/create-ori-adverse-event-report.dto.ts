import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriAdverseEventReportDto {

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_casetype_id_fk: number

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_reporter_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_origin_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_suborigin_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_service_id_fk: number;
        
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_unit_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_patient_id_fk: number;
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_severityclasif_id_fk: number; 
    
    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_eventtype_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_event_id_fk: number;

    // // @IsNumber()
    // @IsNotEmpty()
    // ori_car_risklevel_id_fk: number; 

    @IsNotEmpty()
    @IsString()
    ori_car_description: string;

    @IsOptional()
    @IsString()
    ori_car_inmediateaction: string;

}
