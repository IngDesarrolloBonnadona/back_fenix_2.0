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
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { ReportAnalystAssignmentDto } from '../dto/analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReportAnalystAssignment } from '../entities/report-analyst-assignment.entity';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
export class ReportAnalystAssignmentController {
  constructor(
    private readonly reportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalyst/:idValidator')
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: ReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: number,
  ): Promise<ReportAnalystAssignment> {
    return this.reportAnalisysAssignmentService.assingAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalyst')
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: ReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ): Promise<ReportAnalystAssignment> {
    return this.reportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalyst,
    );
  }

  @Get('listAssignedAnalystsByPosition')
  async listAssignedAnalystsByPosition(
    @Query('positionId') positionId?: number,
  ): Promise<ReportAnalystAssignment[]> {
    return await this.reportAnalisysAssignmentService.findAssignedAnalystsByPosition(
      positionId,
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
    @Query('filingNumber') filingNumber?: string,
    @Query('statusMovementId') statusMovementId?: number,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('eventId') eventId?: number,
    @Query('priorityId') priorityId?: number,
  ) {
    return await this.reportAnalisysAssignmentService.summaryReportsForAssignCases(
      filingNumber,
      statusMovementId,
      caseTypeId,
      eventId,
      priorityId,
    );
  }

  @Put('updateReAssignedAnalyst/:idValidator/:idCaseReportValidate')
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

  @Delete('deleteAssignedAnalyst/:id')
  deleteAssignedAnalyst(@Param('id') id: number): Promise<HttpException> {
    return this.reportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
