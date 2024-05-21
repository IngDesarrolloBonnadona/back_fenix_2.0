import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriIndicatingUnsafeCareReportDto {

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_casetype_id_fk: number

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_reporter_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_origin_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_suborigin_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_patient_id_fk: number;
    
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_service_id_fk: number;
        
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_unit_id_fk: number;
    
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_severityclasif_id_fk: number; 
    
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_eventtype_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_event_id_fk: number;

    @IsNotEmpty()
    @IsString()
    ori_cr_description: string;

    @IsOptional()
    @IsString()
    ori_cr_inmediateaction: string;

    // constructor(data?: any) {
    //     if (data) {
    //         this.ori_cr_casetype_id_fk = data.ori_cr_casetype_id_fk;
    //         this.ori_cr_reporter_id_fk = data.ori_cr_reporter_id_fk;
    //         this.ori_cr_origin_id_fk = data.ori_cr_origin_id_fk;
    //         this.ori_cr_suborigin_id_fk = data.ori_cr_suborigin_id_fk;
    //         this.ori_cr_service_id_fk = data.ori_cr_service_id_fk;
    //         this.ori_cr_unit_id_fk = data.ori_cr_unit_id_fk;
    //         this.ori_cr_patient_id_fk = data.ori_cr_patient_id_fk;
    //         this.ori_cr_severityclasif_id_fk = data.ori_cr_severityclasif_id_fk;
    //         this.ori_cr_eventtype_id_fk = data.ori_cr_eventtype_id_fk;
    //         this.ori_cr_event_id_fk = data.ori_cr_event_id_fk;
    //         this.ori_cr_description = data.ori_cr_description;
    //         this.ori_cr_inmediateaction = data.ori_cr_inmediateaction;
    //     }
    // }
}
