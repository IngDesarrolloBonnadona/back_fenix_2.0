import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseReportValidateService } from './case-report-validate.service';
import { CreateCaseReportValidateDto } from './dto/create-case-report-validate.dto';
import { UpdateCaseReportValidateDto } from './dto/update-case-report-validate.dto';

@Controller('case-report-validate')
export class CaseReportValidateController {
  constructor(private readonly caseReportValidateService: CaseReportValidateService) {}

  @Post()
  create(@Body() createCaseReportValidateDto: CreateCaseReportValidateDto) {
    return this.caseReportValidateService.create(createCaseReportValidateDto);
  }

  @Get()
  findAll() {
    return this.caseReportValidateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseReportValidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto) {
    return this.caseReportValidateService.update(+id, updateCaseReportValidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseReportValidateService.remove(+id);
  }
}
