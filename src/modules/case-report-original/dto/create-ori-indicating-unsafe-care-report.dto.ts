import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateDeviceDto } from "src/modules/device/dto/create-device.dto";
import { CreateMedicineDto } from "src/modules/medicine/dto/create-medicine.dto";

export class CreateOriIndicatingUnsafeCareReportDto {

    @IsNumber()
    @IsNotEmpty()
    ori_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    ori_cr_reporter_id: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_origin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_suborigin_id_fk: number;

    @IsString()
    @IsNotEmpty()
    ori_cr_documentpatient: string;

    @IsString()
    @IsNotEmpty()
    ori_cr_doctypepatient: string

    @IsString()
    @IsNotEmpty()
    ori_cr_firstnamepatient: string

    @IsString()
    @IsNotEmpty()
    ori_cr_secondnamepatient: string

    @IsString()
    @IsNotEmpty()
    ori_cr_firstlastnamepatient: string

    @IsString()
    @IsNotEmpty()
    ori_cr_secondlastnamepatient: string

    @IsNumber()
    @IsNotEmpty()
    ori_cr_agepatient: number

    @IsString()
    @IsNotEmpty()
    ori_cr_genderpatient: string

    @IsString()
    @IsNotEmpty()
    ori_cr_epspatient: string

    @IsNumber()
    @IsNotEmpty()
    ori_cr_admconsecutivepatient: number
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_service_id_fk: number;
        
    @IsNumber()
    @IsNotEmpty()
    ori_cr_unit_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_severityclasif_id_fk: number; 
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_eventtype_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_event_id_fk: number;

    @IsNotEmpty()
    @IsString()
    ori_cr_description: string;

    @IsOptional()
    @IsString()
    ori_cr_inmediateaction: string;
    
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
