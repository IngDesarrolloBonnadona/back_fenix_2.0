import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateClinicalResearchCaseReportValidateDto } from 'src/modules/clinical-research-case-report-validate/dto/create-clinical-research-case-report-validate.dto';
import { CreateClinicalResearchFailedMeasureDto } from 'src/modules/clinical-research-failed-measures/dto/create-clinical-research-failed-measure.dto';
import { CreateClinicalResearchInfluencingFactorDto } from 'src/modules/clinical-research-influencing-factor/dto/create-clinical-research-influencing-factor.dto';

export class CreateClinicalResearchDto {
  @IsOptional()
  @IsBoolean()
  res_c_isComplete: boolean;

  @IsOptional()
  @IsNumber()
  res_c_instrument_id_fk: number;

  @IsOptional()
  @IsBoolean()
  res_c_failure: boolean;

  @IsOptional()
  @IsBoolean()
  res_c_damage: boolean;

  @IsOptional()
  @IsString()
  res_c_clinicalcontext: string;

  @IsOptional()
  @IsNumber()
  res_c_devicetype_id_fk: number;

  @IsOptional()
  @IsString()
  res_c_otherdevicetype: string;

  @IsOptional()
  @IsNumber()
  res_c_damagetype_id_fk: number;

  @IsOptional()
  @IsString()
  res_c_otherdamagetype: string;

  @IsOptional()
  @IsNumber()
  res_c_fluidtype_id_fk: number;

  @IsOptional()
  @IsString()
  res_c_fluidname: string;

  @IsOptional()
  @IsBoolean()
  res_c_phlebitisgeneratingfluid: boolean;

  @IsOptional()
  @IsNumber()
  res_c_fluidph: number;

  @IsOptional()
  @IsBoolean()
  res_c_adequateinfusiontime: boolean;

  @IsOptional()
  @IsNumber()
  res_c_infusiontime: number;

  @IsOptional()
  @IsBoolean()
  res_c_adequatedilution: boolean;

  @IsOptional()
  @IsString()
  res_c_fluiddilution: string;

  @IsOptional()
  @IsString()
  res_c_otherinfluencingfactors: string;

  @IsOptional()
  @IsString()
  res_c_otherfailedmeasures: string;

  @IsOptional()
  @IsNumber()
  res_c_riskfactors_id_fk: number;

  @IsOptional()
  @IsString()
  res_c_otherriskfactors: string;

  @IsOptional()
  @IsString()
  res_c_venipuncturetechnique: string;

  @IsOptional()
  @IsString()
  res_c_additionalfindings: string;

  @IsOptional()
  @IsBoolean()
  res_c_carefailures: boolean;

  @IsOptional()
  @IsNumber()
  res_c_safetybarriers_id_fk: number;

  @IsOptional()
  @IsBoolean()
  res_c_incorrectactions: boolean;

  @IsOptional()
  @IsBoolean()
  res_c_unsafeactions: boolean;

  @IsOptional()
  @IsString()
  res_c_conclusions: string;

  @IsOptional()
  @IsBoolean()
  res_c_casepreventable: boolean;

  @IsOptional()
  @IsNumber()
  res_c_actionplan_id_fk: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicalResearchInfluencingFactorDto)
  influencingFactor: CreateClinicalResearchInfluencingFactorDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicalResearchFailedMeasureDto)
  failedMeasure: CreateClinicalResearchFailedMeasureDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicalResearchCaseReportValidateDto)
  caseReportValidate: CreateClinicalResearchCaseReportValidateDto[];
}
