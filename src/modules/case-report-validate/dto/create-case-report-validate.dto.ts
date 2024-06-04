import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCaseReportValidateDto {
    @IsNumber()
    @IsNotEmpty()
    val_cr_consecutive_id: number

    @IsNotEmpty()
    @IsString()
    val_cr_filingnumber: string

    @IsNumber()
    @IsNotEmpty()
    val_cr_previous_id: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_reporter_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_origin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_suborigin_id_fk: number;

    @IsUUID()
    @IsNotEmpty()
    val_cr_originalcase_id_fk: string
    
    @IsString()
    @IsNotEmpty()
    val_cr_documentpatient: string;

    @IsString()
    @IsNotEmpty()
    val_cr_doctypepatient: string

    @IsString()
    @IsNotEmpty()
    val_cr_firstnamepatient: string

    @IsString()
    @IsNotEmpty()
    val_cr_secondnamepatient: string

    @IsString()
    @IsNotEmpty()
    val_cr_firstlastnamepatient: string

    @IsString()
    @IsNotEmpty()
    val_cr_secondlastnamepatient: string

    @IsNumber()
    @IsNotEmpty()
    val_cr_agepatient: number

    @IsString()
    @IsNotEmpty()
    val_cr_genderpatient: string

    @IsString()
    @IsNotEmpty()
    val_cr_epspatient: string

    @IsNumber()
    @IsNotEmpty()
    val_cr_admconsecutivepatient: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_eventtype_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_service_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_event_id_fk: number;

    @IsNumber()
    @IsOptional()
    val_cr_risktype_id_fk: number;

    @IsNumber()
    @IsOptional()
    val_cr_severityclasif_id_fk: number;

    @IsNumber()
    @IsOptional()
    val_cr_risklevel_id_fk: number;

    @IsNumber()
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
