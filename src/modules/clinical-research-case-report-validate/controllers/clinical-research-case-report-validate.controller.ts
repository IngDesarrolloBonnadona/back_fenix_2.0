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

  @Post()
  create(
    @Body()
    createClinicalResearchCaseReportValidateDto: CreateClinicalResearchCaseReportValidateDto,
  ) {
    return this.clinicalResearchCaseReportValidateService.create(
      createClinicalResearchCaseReportValidateDto,
    );
  }

  @Get()
  findAll() {
    return this.clinicalResearchCaseReportValidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalResearchCaseReportValidateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateClinicalResearchCaseReportValidateDto: UpdateClinicalResearchCaseReportValidateDto,
  ) {
    return this.clinicalResearchCaseReportValidateService.update(
      +id,
      updateClinicalResearchCaseReportValidateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalResearchCaseReportValidateService.remove(+id);
  }
}
