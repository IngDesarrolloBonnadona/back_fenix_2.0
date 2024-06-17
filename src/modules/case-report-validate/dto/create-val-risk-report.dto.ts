import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested, IsUUID } from "class-validator";
import { Type } from "class-transformer";
import { CreateDeviceDto } from "src/modules/device/dto/create-device.dto";
import { CreateMedicineDto } from "src/modules/medicine/dto/create-medicine.dto";

export class CreateValRiskReportDto {
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_reporter_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_origin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_suborigin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_service_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_unit_id_fk: number;

    @IsString()
    @IsOptional()
    val_cr_documentpatient: string;

    @IsString()
    @IsOptional()
    val_cr_doctypepatient: string

    @IsString()
    @IsOptional()
    val_cr_firstnamepatient: string

    @IsString()
    @IsOptional()
    val_cr_secondnamepatient: string

    @IsString()
    @IsOptional()
    val_cr_firstlastnamepatient: string

    @IsString()
    @IsOptional()
    val_cr_secondlastnamepatient: string

    @IsNumber()
    @IsOptional()
    val_cr_agepatient: number

    @IsString()
    @IsOptional()
    val_cr_genderpatient: string

    @IsString()
    @IsOptional()
    val_cr_epspatient: string

    @IsNumber()
    @IsOptional()
    val_cr_admconsecutivepatient: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_eventtype_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_event_id_fk: number;
    
    @IsNumber()
    @IsOptional()
    val_cr_risktype_id_fk: number; 

    @IsNotEmpty()
    @IsString()
    val_cr_description: string;

    @IsBoolean()
    @IsNotEmpty()
    val_cr_materializedrisk: boolean;

    @IsBoolean()
    @IsNotEmpty()
    val_cr_associatedpatient: boolean;
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_priority_id_fk: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMedicineDto)
    medicines: CreateMedicineDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDeviceDto)
    devices: CreateDeviceDto[];
}