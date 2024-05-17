import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('case-report-validate')
@Controller('case-report-validate')
export class CaseReportValidateController {
  constructor(private readonly caseReportValidateService: CaseReportValidateService) {}

  @Get('/listReportsValidate')
  listReportsValidate() : Promise<CaseReportValidate[]> {
    return this.caseReportValidateService.findAllReportsValidate();
  }

  @Get('/listReportValidate/:id')
  findReportValidate(@Param('id') id: number) : Promise<CaseReportValidate> {
    return this.caseReportValidateService.findOneReportValidate(id);
  }

  @Put('/updateReportValidate/:id')
  updateReportValidate(
    @Param('id') id: number, 
    @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto
  ) : Promise<HttpException> {
    return this.caseReportValidateService.updateReportValidate(id, updateCaseReportValidateDto);
  }

  @Delete('/removeReportValidate/:id')
  async removeReportValidate(@Param('id') id: number): Promise<{ message: string }> {
      return await this.caseReportValidateService.removeReportValidate(id);      
  }
}
