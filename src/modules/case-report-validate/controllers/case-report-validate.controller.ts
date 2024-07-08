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
import { QueryCaseReportValidateDto } from '../dto/query-case-report-validate.dto';

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

  @Post('/createReportValidate/:idValidator/:reportId')
  async createReportValidate(
    @Body() createReportValDto: CreateReportValDto,
    @Ip() clientIp: string,
    @Param('reportId') reportId: string,
    @Param('idValidator') idValidator: number
  ): Promise<any> {
    return await this.caseReportValidateService.createReportValidate(
      createReportValDto,
      clientIp,
      reportId,
      idValidator
    );
  }

  @Get('/summaryReportsValidate')
  async SummaryReportsValidate(
    @Query() query: QueryCaseReportValidateDto,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = query.creationDate
      ? new Date(query.creationDate)
      : undefined;

    return await this.caseReportValidateService.summaryReportsValidate(
      creationDateObj,
      query.filingNumber,
      query.statusMovementId,
      query.patientDoc,
      query.caseTypeId,
      query.unitId,
      query.priorityId,
      query.severityClasificationId,
      query.eventTypeId,
    );
  }

  // @Get('/summaryReportsForValidator')
  // async SummaryReportsForValidator(
  //   @Query('filingNumber') filingNumber?: string,
  //   @Query('statusMovementId') statusMovementId?: number,
  //   @Query('caseTypeId') caseTypeId?: number,
  //   @Query('patientDoc') patientDoc?: string,
  //   @Query('priorityId') priorityId?: number,
  //   @Query('creationDate') creationDate?: string,
  // ): Promise<CaseReportValidate[]> {
  //   const creationDateObj = creationDate ? new Date(creationDate) : undefined;

  //   return await this.caseReportValidateService.summaryReportsForValidator(
  //     filingNumber,
  //     statusMovementId,
  //     caseTypeId,
  //     patientDoc,
  //     priorityId,
  //     creationDateObj,
  //   );
  // }

  @Get('/summaryReportsForReview')
  async summaryReportsForReview(
    @Query() query: QueryCaseReportValidateDto,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = query.creationDate
      ? new Date(query.creationDate)
      : undefined;

    return await this.caseReportValidateService.summaryReportsForReview(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.patientDoc,
      query.priorityId,
      creationDateObj,
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

  @Patch('/updateReportValidate/:id')
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
