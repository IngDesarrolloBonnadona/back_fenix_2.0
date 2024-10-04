import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCaseReportOriginalDto {
  @IsDateString()
  @IsNotEmpty()
  ori_cr_dateofcase: Date;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_casetype_id_fk: number;

  @IsNotEmpty()
  @IsString()
  ori_cr_filingnumber: string;

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

  @IsString()
  @IsOptional()
  ori_cr_documentpatient: string;

  @IsString()
  @IsOptional()
  ori_cr_doctypepatient: string;

  @IsString()
  @IsOptional()
  ori_cr_firstnamepatient: string;

  @IsString()
  @IsOptional()
  ori_cr_secondnamepatient: string;

  @IsString()
  @IsOptional()
  ori_cr_firstlastnamepatient: string;

  @IsString()
  @IsOptional()
  ori_cr_secondlastnamepatient: string;

  @IsNumber()
  @IsOptional()
  ori_cr_agepatient: number;

  @IsString()
  @IsOptional()
  ori_cr_genderpatient: string;

  @IsString()
  @IsOptional()
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
  ori_cr_eventtype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_originservice_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_reportingservice_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_event_id_fk: number;

  @IsString()
  @IsOptional()
  ori_cr_descriptionOthers: string;

  @IsNumber()
  @IsOptional()
  ori_cr_risktype_id_fk: number;

  @IsNumber()
  @IsOptional()
  ori_cr_severityclasif_id_fk: number;

  @IsNumber()
  @IsOptional()
  ori_cr_risklevel_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_priority_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  ori_cr_statusmovement_id_fk: number;

  @IsNumber()
  @IsOptional()
  ori_cr_characterization_id_fk: number;

  @IsBoolean()
  @IsOptional()
  ori_cr_infoprovidedfamily: boolean;

  @IsBoolean()
  @IsOptional()
  ori_cr_clinicalfollowrequired: boolean;

  @IsString()
  @IsOptional()
  ori_cr_observationscharacterization: string;

  @IsString()
  @IsOptional()
  ori_cr_description: string;

  @IsOptional()
  @IsString()
  ori_cr_inmediateaction: string;

  @IsBoolean()
  @IsOptional()
  ori_cr_materializedrisk: boolean;

  @IsBoolean()
  @IsOptional()
  ori_cr_associatedpatient: boolean;
}
