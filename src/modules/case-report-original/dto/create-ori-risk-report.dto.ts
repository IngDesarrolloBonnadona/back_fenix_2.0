import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateDeviceDto } from "src/modules/device/dto/create-device.dto";
import { CreateMedicineDto } from "src/modules/medicine/dto/create-medicine.dto";

export class CreateOriRiskReportDto {
    @IsNumber()
    @IsNotEmpty()
    ori_cr_casetype_id_fk: number

    @IsNumber()
    @IsNotEmpty()
    ori_cr_reporter_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_origin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_suborigin_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_service_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_unit_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_patient_id_fk: number;

    @IsNumber()
    @IsNotEmpty()
    ori_cr_eventtype_id_fk: number;
    
    @IsNumber()
    @IsNotEmpty()
    ori_cr_event_id_fk: number;
    
    @IsNumber()
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
