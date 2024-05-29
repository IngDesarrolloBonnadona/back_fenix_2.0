import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';
import { ApiTags } from '@nestjs/swagger';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';

@ApiTags('case-report-validate')
@Controller('case-report-validate')
export class CaseReportValidateController {
  constructor(
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  @Post('/findReportsSimilar')
  async findReportsSimilar(
    @Body() similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    return await this.caseReportValidateService.findSimilarCaseReportsValidate(
      similarCaseReportValidate,
    );
  }

  @Get('/summaryReportsValidate')
  async SummaryReportsValidate(
    @Query('creationDate') creationDate?: string,
    @Query('id') id?: string,
    @Query('patientId') patientId?: number,
    @Query('caseTypeId') caseTypeId?: number,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.SummaryReportsValidate(
      creationDateObj,
      id,
      patientId,
      caseTypeId,
    );
  }

  @Get('/listReportsValidate')
  listReportsValidate(): Promise<CaseReportValidate[]> {
    return this.caseReportValidateService.findAllReportsValidate();
  }

  @Get('/listReportValidate/:id')
  findReportValidate(@Param('id') id: string): Promise<CaseReportValidate> {
    return this.caseReportValidateService.findOneReportValidate(id);
  }

  @Put('/updateReportValidate/:id')
  updateReportValidate(
    @Param('id') id: string,
    @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto,
  ): Promise<HttpException> {
    return this.caseReportValidateService.updateReportValidate(
      id,
      updateCaseReportValidateDto,
    );
  }

  @Delete('/removeReportValidate/:id')
  async removeReportValidate(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return await this.caseReportValidateService.removeReportValidate(id);
  }
}
