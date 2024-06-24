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
  Ip,
} from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';
import { ApiTags } from '@nestjs/swagger';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { CreateReportValDto } from '../helper/val-dto-validator.helper';

@ApiTags('case-report-validate')
@Controller('case-report-validate')
export class CaseReportValidateController {
  constructor(
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  @Get('/findReportsSimilar')
  async findReportsSimilar(
    @Body() similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    return await this.caseReportValidateService.findSimilarCaseReportsValidate(
      similarCaseReportValidate,
    );
  }

  @Post('/createReportValidate/:reportId')
  async createReportValidate(
    @Body() createReportValDto: CreateReportValDto,
    @Ip() clientIp: string,
    @Param('reportId') reportId: string,
  ): Promise<any> {
    return await this.caseReportValidateService.createReportValidate(
      createReportValDto,
      clientIp,
      reportId,
    );
  }

  @Get('/summaryReportsValidate')
  async SummaryReportsValidate(
    @Query('creationDate') creationDate?: string,
    @Query('filingNumber') filingNumber?: string,
    @Query('patientDoc') patientDoc?: string,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('unitId') unitId?: number,
    @Query('priorityId') priorityId?: number,
    @Query('severityClasificationId') severityClasificationId?: number,
    @Query('eventTypeId') eventTypeId?: number,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.summaryReportsValidate(
      creationDateObj,
      filingNumber,
      patientDoc,
      caseTypeId,
      unitId,
      priorityId,
      severityClasificationId,
      eventTypeId,
    );
  }

  @Get('/summaryReportsForValidator')
  async SummaryReportsForValidator(
    @Query('creationDate') creationDate?: string,
    @Query('filingNumber') filingNumber?: string,
    @Query('patientDoc') patientDoc?: string,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('priorityId') priorityId?: number,
    @Query('statusMovementId') statusMovementId?: number,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.summaryReportsForValidator(
      creationDateObj,
      filingNumber,
      patientDoc,
      caseTypeId,
      priorityId,
      statusMovementId,
    );
  }

  @Get('/summaryReportsForReview')
  async summaryReportsForReview(
    @Query('creationDate') creationDate?: string,
    @Query('filingNumber') filingNumber?: string,
    @Query('patientDoc') patientDoc?: string,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('priorityId') priorityId?: number,
    @Query('statusMovementId') statusMovementId?: number,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.summaryReportsForReview(
      creationDateObj,
      filingNumber,
      patientDoc,
      caseTypeId,
      priorityId,
      statusMovementId,
    );
  }

  @Get('/summaryReportsForReview')
  async summaryReportsForAssignCases(
    @Query('filingNumber') filingNumber?: string,
    @Query('statusMovementId') statusMovementId?: number,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('eventId') eventId?: number,
    @Query('priorityId') priorityId?: number,
  ): Promise<CaseReportValidate[]> {

    return await this.caseReportValidateService.summaryReportsForAssignCases(
      filingNumber,
      statusMovementId,
      caseTypeId,
      eventId,
      priorityId,
    );
  }

  @Get('/listReportsValidate')
  listReportsValidate(): Promise<CaseReportValidate[]> {
    return this.caseReportValidateService.findAllReportsValidate();
  }

  @Get('/findReportValidate/:id')
  findReportValidate(@Param('id') id: string): Promise<CaseReportValidate> {
    return this.caseReportValidateService.findOneReportValidate(id);
  }

  @Get('/findReportValidateByConsecutive/:consecutive')
  findReportValidateByConsecutive(
    @Param('consecutive') consecutive: string,
  ): Promise<CaseReportValidate[]> {
    return this.caseReportValidateService.findOneReportValidateByConsecutive(
      consecutive,
    );
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

  @Delete('/cancelReportValidate/:id')
  async cancelReportValidate(
    @Param('id') id: string,
    @Ip() clientIp: string,
  ): Promise<Promise<HttpException>> {
    return await this.caseReportValidateService.cancelReportValidate(
      id,
      clientIp,
    );
  }
}
