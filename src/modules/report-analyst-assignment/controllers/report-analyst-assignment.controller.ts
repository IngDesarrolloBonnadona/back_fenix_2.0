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
  UseGuards,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReportAnalystAssignment } from '../entities/report-analyst-assignment.entity';
import { QueryReportAnalystAssignmentDto } from '../dto/query-report-analyst-assignment.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
@UseGuards(PermissionGuard) // Usa el guard de permisos
export class ReportAnalystAssignmentController {
  constructor(
    private readonly reportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assingAnalyst/:idValidator/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  createAssingAnalystReporter(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ) {
    return this.reportAnalisysAssignmentService.assingAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalystCurrent/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalystCurrent') idAnalystCurrent: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalystCurrent,
    );
  }

  @Get('listAssignedAnalystsByPosition/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  async listAssignedAnalystsByPosition(
    @Query() query: QueryReportAnalystAssignmentDto,
  ) {
    return await this.reportAnalisysAssignmentService.findAssignedAnalystsByPosition(
      query,
    );
  }

  @Get('findAssignedAnalyst/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  findAssignedAnalyst(
    @Param('id') id: number,
  ) {
    return this.reportAnalisysAssignmentService.findOneAssignedAnalyst(id);
  }

  @Get('findInfoAnalystByCode/:code/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  findInfoAnalystByCode(@Param('code') code?: number) {
    return this.reportAnalisysAssignmentService.findInfoAnalystByCode(code);
  }

  @Get('/summaryReportsForAssignCases/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
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

  @Patch(
    'reAssignedAnalyst/:idValidator/:idCaseReportValidate/:userIdPermission',
  )
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  updateReAssignedAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
  ) {
    return this.reportAnalisysAssignmentService.reAssingAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
      idValidator,
      idCaseReportValidate,
    );
  }

  @Patch(
    'returnCaseToValidator/:idAnalyst/:idCaseReportValidate/:userIdPermission',
  )
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  updateReturnCaseToValidator(
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseToValidator(
      idCaseReportValidate,
      clientIp,
      idAnalyst,
    );
  }

  @Delete('deleteAssignedAnalyst/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.reportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
