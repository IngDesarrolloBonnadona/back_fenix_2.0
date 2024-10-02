import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCaseReportValidateDto {
  @IsDateString()
  @IsNotEmpty()
  val_cr_dateofcase: Date;

  @IsNumber()
  @IsNotEmpty()
  val_cr_consecutive_id: number;

  @IsNotEmpty()
  @IsString()
  val_cr_filingnumber: string;

  @IsNumber()
  @IsNotEmpty()
  val_cr_previous_id: number;

  @IsBoolean()
  @IsNotEmpty()
  val_cr_anonymoususer: boolean;

  @IsString()
  @IsOptional()
  val_cr_reporter_id: string;

  @IsNumber()
  @IsNotEmpty()
  val_cr_origin_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_suborigin_id_fk: number;

  @IsUUID()
  @IsNotEmpty()
  val_cr_originalcase_id_fk: string;

  @IsString()
  @IsOptional()
  val_cr_documentpatient: string;

  @IsString()
  @IsOptional()
  val_cr_doctypepatient: string;

  @IsString()
  @IsOptional()
  val_cr_firstnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_secondnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_firstlastnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_secondlastnamepatient: string;

  @IsNumber()
  @IsOptional()
  val_cr_agepatient: number;

  @IsString()
  @IsOptional()
  val_cr_genderpatient: string;

  @IsString()
  @IsOptional()
  val_cr_epspatient: string;

  @IsString()
  @IsOptional()
  val_cr_diagnosticcode: string;

  @IsString()
  @IsOptional()
  val_cr_diagnosticdescription: string;

  @IsNumber()
  @IsOptional()
  val_cr_admconsecutivepatient: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_casetype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_eventtype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_originservice_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_reportingservice_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_event_id_fk: number;

  @IsString()
  @IsOptional()
  val_cr_descriptionOthers: string;

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
  val_cr_statusmovement_id_fk: number;

  @IsNumber()
  @IsOptional()
  val_cr_characterization_id_fk: number;

  @IsBoolean()
  @IsOptional()
  val_cr_infoprovidedfamily: boolean;

  @IsBoolean()
  @IsOptional()
  val_cr_clinicalfollowrequired: boolean;

  @IsString()
  @IsOptional()
  val_cr_observationscharacterization: string;

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
