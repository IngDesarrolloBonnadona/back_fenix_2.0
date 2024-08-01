import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsBoolean } from "class-validator";
import { CreateDeviceDto } from "src/modules/device-case-report/dto/create-device.dto";
import { CreateMedicineDto } from "src/modules/medicine-case-report/dto/create-medicine.dto";

export class CreateValIncidentReportDto {
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_reporter_id: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_origin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_suborigin_id_fk: number;

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
    val_cr_service_id_fk: number;
        
    @IsNumber()
    @IsNotEmpty()
    val_cr_unit_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_severityclasif_id_fk: number; 
    
    @IsNumber()
    @IsNotEmpty()
    val_cr_eventtype_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    val_cr_event_id_fk: number;

    @IsNotEmpty()
    @IsString()
    val_cr_description: string;

    @IsOptional()
    @IsString()
    val_cr_inmediateaction: string;

    @IsNumber()
    @IsOptional()
    val_cr_characterization_id_fk: number

    @IsBoolean()
    @IsOptional()
    val_cr_infoprovidedfamily: boolean

    @IsBoolean()
    @IsOptional()
    val_cr_clinicalfollowrequired: boolean

    @IsString()
    @IsOptional()
    val_cr_observationscharacterization: string;

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