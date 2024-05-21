import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString,  } from "@nestjs/class-validator";

export class CreateOriRiskReportDto {
    // // @IsNumber()
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
    ori_cr_service_id_fk: number;
    
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_unit_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_patient_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    ori_cr_eventtype_id_fk: number;
    
    // @IsNumber()
    @IsNotEmpty()
    ori_cr_event_id_fk: number;
    
    // @IsNumber()
    @IsOptional()
    ori_cr_risktype_id_fk: number; 

    @IsNotEmpty()
    @IsString()
    ori_cr_description: string;

    @IsBoolean()
    @IsNotEmpty()
    ori_cr_materializedrisk: boolean;

    @IsBoolean()
    @IsNotEmpty()
    ori_cr_associatedpatient: boolean;

    // constructor(data?: any) {
    //     if (data) {
    //         this.ori_cr_casetype_id_fk = data.ori_cr_casetype_id_fk;
    //         this.ori_cr_reporter_id_fk = data.ori_cr_reporter_id_fk;
    //         this.ori_cr_origin_id_fk = data.ori_cr_origin_id_fk;
    //         this.ori_cr_suborigin_id_fk = data.ori_cr_suborigin_id_fk;
    //         this.ori_cr_service_id_fk = data.ori_cr_service_id_fk;
    //         this.ori_cr_unit_id_fk = data.ori_cr_unit_id_fk;
    //         this.ori_cr_patient_id_fk = data.ori_cr_patient_id_fk;
    //         this.ori_cr_eventtype_id_fk = data.ori_cr_eventtype_id_fk;
    //         this.ori_cr_event_id_fk = data.ori_cr_event_id_fk;
    //         this.ori_cr_risktype_id_fk = data.ori_cr_risktype_id_fk;
    //         this.ori_cr_description = data.ori_cr_description;
    //         this.ori_cr_materializedrisk = data.ori_cr_materializedrisk;
    //         this.ori_cr_associatedpatient = data.ori_cr_associatedpatient;
    //     }
    // }
}
