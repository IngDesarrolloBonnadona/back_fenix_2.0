import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Ip,
  Query,
  HttpException,
  Patch,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReportAnalystAssignment } from '../entities/report-analyst-assignment.entity';
import { QueryReportAnalystAssignmentDto } from '../dto/query-report-analyst-assignment.dto';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
export class ReportAnalystAssignmentController {
  constructor(
    private readonly reportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalyst/:idValidator')
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ): Promise<HttpException> {
    return this.reportAnalisysAssignmentService.assingAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalystCurrent')
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalystCurrent') idAnalystCurrent: number,
  ): Promise<HttpException> {
    return this.reportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalystCurrent,
    );
  }

  @Get('listAssignedAnalystsByPosition')
  async listAssignedAnalystsByPosition(
    @Query() query: QueryReportAnalystAssignmentDto,
  ): Promise<ReportAnalystAssignment[]> {
    return await this.reportAnalisysAssignmentService.findAssignedAnalystsByPosition(
      query.positionId,
    );
  }

  @Get('findAssignedAnalyst/:id')
  findAssignedAnalyst(
    @Param('id') id: number,
  ): Promise<ReportAnalystAssignment> {
    return this.reportAnalisysAssignmentService.findOneAssignedAnalyst(id);
  }

  @Get('findInfoAnalystByCode/:code')
  findInfoAnalystByCode(@Param('code') code?: number) {
    return this.reportAnalisysAssignmentService.findInfoAnalystByCode(code);
  }

  @Get('/summaryReportsForAssignCases')
  async summaryReportsForAssignCases(
  @Query() query: QueryReportAnalystAssignmentDto,
  ) {
    return await this.reportAnalisysAssignmentService.summaryReportsForAssignCases(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Patch('updateReAssignedAnalyst/:idValidator/:idCaseReportValidate')
  updateReAssignedAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
  ): Promise<HttpException> {
    return this.reportAnalisysAssignmentService.reAssingAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
      idValidator,
      idCaseReportValidate,
    );
  }

  @Patch('updateReturnCaseToValidator/:idAnalyst/:idCaseReportValidate')
  updateReturnCaseToValidator(
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseToValidator(
      idCaseReportValidate,
      clientIp,
      idAnalyst,
    );
  }

  @Delete('deleteAssignedAnalyst/:id')
  deleteAssignedAnalyst(@Param('id') id: number): Promise<HttpException> {
    return this.reportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
