import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDeviceDto } from 'src/modules/device-case-report/dto/create-device.dto';
import { CreateMedicineDto } from 'src/modules/medicine-case-report/dto/create-medicine.dto';

export class CreateOriComplicationsReportDto {
  @IsDateString()
  @IsNotEmpty()
  ori_cr_dateofcase: Date;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_casetype_id_fk: number;

  @IsBoolean()
  @IsNotEmpty()
  ori_cr_anonymoususer: boolean;

  @IsString()
  @IsOptional()
  ori_cr_reporter_id: string;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_origin_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_suborigin_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_originservice_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_reportingservice_id_fk: number;

  @IsString()
  @IsNotEmpty()
  ori_cr_documentpatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_doctypepatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_firstnamepatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_secondnamepatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_firstlastnamepatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_secondlastnamepatient: string;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_agepatient: number;

  @IsString()
  @IsNotEmpty()
  ori_cr_genderpatient: string;

  @IsString()
  @IsNotEmpty()
  ori_cr_epspatient: string;

  @IsString()
  @IsOptional()
  ori_cr_diagnosticcode: string;

  @IsString()
  @IsOptional()
  ori_cr_diagnosticdescription: string;

  @IsNumber()
  @IsOptional()
  ori_cr_admconsecutivepatient: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_severityclasif_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_eventtype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_event_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_risklevel_id_fk: number;

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
  medicines: CreateMedicineDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDeviceDto)
  devices: CreateDeviceDto[];
}
