import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { IsUUID } from "class-validator";
import { CreateDeviceDto } from "src/modules/device/dto/create-device.dto";
import { CreateMedicineDto } from "src/modules/medicine/dto/create-medicine.dto";

export class CreateValIncidentReportDto {
    @IsNumber()
    @IsNotEmpty()
    val_cr_consecutive_id: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_previous_id: number

    @IsNumber()
    @IsNotEmpty()
    val_cr_casetype_id_fk: number
    
    @IsUUID()
    @IsNotEmpty()
    val_cr_originalcase_id_fk: string

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
    val_cr_patient_id_fk: number;
    
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