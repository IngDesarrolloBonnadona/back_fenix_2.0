import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateCaseReportValidateDto {
    @IsNumber()
    @IsNotEmpty()
    val_cr_reporter_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_origin_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_suborigin_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_originalcase_id_fk: number
    
    // @IsNumber()
    @IsNotEmpty()
    val_cr_patient_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number

    // @IsNumber()
    @IsNotEmpty()
    val_cr_eventtype_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_service_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_event_id_fk: number;

    // @IsNumber()
    @IsOptional()
    val_cr_risktype_id_fk: number;

    // @IsNumber()
    @IsOptional()
    val_cr_severityclasif_id_fk: number;

    // @IsNumber()
    @IsOptional()
    val_cr_risklevel_id_fk: number;

    // @IsNumber()
    @IsNotEmpty()
    val_cr_unit_id_fk: number;

    @IsNotEmpty()
    @IsString()
    val_cr_description: string;

    @IsOptional()
    @IsString()
    val_cr_inmediateaction: string;

    @IsBoolean()
    @IsOptional()
    val_cr_materializedrisk: boolean;

    @IsBoolean()
    @IsOptional()
    val_cr_associatedpatient: boolean;

    @IsBoolean()
    @IsOptional()
    val_cr_validated: boolean;

}
