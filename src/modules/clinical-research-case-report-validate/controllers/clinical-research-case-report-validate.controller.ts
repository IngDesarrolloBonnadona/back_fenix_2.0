import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicalResearchCaseReportValidateService } from '../services/clinical-research-case-report-validate.service';
import { CreateClinicalResearchCaseReportValidateDto } from '../dto/create-clinical-research-case-report-validate.dto';
import { UpdateClinicalResearchCaseReportValidateDto } from '../dto/update-clinical-research-case-report-validate.dto';

@Controller('clinical-research-case-report-validate')
export class ClinicalResearchCaseReportValidateController {
  constructor(
    private readonly clinicalResearchCaseReportValidateService: ClinicalResearchCaseReportValidateService,
  ) {}
}
