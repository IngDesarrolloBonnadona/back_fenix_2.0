import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { CreateCaseReportValidateDto } from '../dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';

@Controller('case-report-validate')
export class CaseReportValidateController {
  constructor(private readonly caseReportValidateService: CaseReportValidateService) {}

  @Post()
  create(@Body() createCaseReportValidateDto: CreateCaseReportValidateDto) {
    return this.caseReportValidateService.create(createCaseReportValidateDto);
  }

  @Get()
  findAll() : Promise<CaseReportValidate[]> {
    return this.caseReportValidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) : Promise<CaseReportValidate> {
    return this.caseReportValidateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto
  ) : Promise<CaseReportValidate> {
    return this.caseReportValidateService.update(+id, updateCaseReportValidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) : Promise<CaseReportValidate> {
    return this.caseReportValidateService.remove(+id);
  }
}
