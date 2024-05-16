import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';

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

  @Patch('/updateReportValidate/:id')
  updateReportValidate(
    @Param('id') id: number, 
    @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto
  ) : Promise<CaseReportValidate> {
    return this.caseReportValidateService.updateReportValidate(id, updateCaseReportValidateDto);
  }

  @Delete('/removeReportValidate/:id')
  async removeReportValidate(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.caseReportValidateService.removeReportValidate(id);      
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
