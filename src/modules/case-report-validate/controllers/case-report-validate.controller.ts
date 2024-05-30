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

  @Post('/findReportsSimilar')
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
    @Query('patientId') patientId?: number,
    @Query('caseTypeId') caseTypeId?: number,
  ): Promise<CaseReportValidate[]> {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.SummaryReportsValidate(
      creationDateObj,
      filingNumber,
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
