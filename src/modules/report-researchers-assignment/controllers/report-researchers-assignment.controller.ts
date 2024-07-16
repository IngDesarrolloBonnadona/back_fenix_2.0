import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResearchersService } from '../services/report-researchers-assignment.service';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { ReportResearcherAssignment } from '../entities/report-researchers-assignment.entity';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { QueryReportResearchersAssignmentDto } from '../dto/query-report-researcher-assignment.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('report-researchers-assignment')
@Controller('report-researchers-assignment')
@UseGuards(PermissionGuard)
export class ReportResearchersAssignmentController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filterResearchers/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  filterResearchers(
    @Query() query: QueryReportResearchersAssignmentDto,
  ): Promise<FilterReportResearcherAssignmentDto[]> {
    const filter = new FilterReportResearcherAssignmentDto();
    filter.empImmediateBoss = query.empImmediateBoss;
    filter.empPosition = query.empPosition;

    return this.researchersService.filterResearchers(filter);
  }

  @Get('findAssignedResearch/:id')
  findAssignedResearch(
    @Param('id') id: number,
  ): Promise<ReportResearcherAssignment> {
    return this.researchersService.findOneAssignedResearch(id);
  }

  @Get('/summaryReportsMyAssignedCases/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.INVESTIGATOR)
  async summaryReportsMyAssignedCases(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyAssignedCases(
      query.filingNumber,
      query.patientDoc,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Get('/summaryReportsMyCasesByCharacterization/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.INVESTIGATOR)
  async summaryReportsMyCasesByCharacterization(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyCasesByCharacterization(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Post('assingResearcher/:idAnalyst/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  createAssingResearcher(
    @Body() createResearcherDto: CreateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ): Promise<HttpException> {
    return this.researchersService.assingResearcher(
      createResearcherDto,
      clientIp,
      idAnalyst,
    );
  }

  @Patch('reAssignResearch/:idAnalyst/:idCaseReportValidate/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  updateReAssignedResearch(
    @Body() updateResearcherDto: UpdateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
  ): Promise<HttpException> {
    return this.researchersService.reAssingResearcher(
      updateResearcherDto,
      clientIp,
      idAnalyst,
      idCaseReportValidate,
    );
  }

  @Patch('ReturnCaseToAnalyst/:idResearcher/:idCaseReportValidate/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.INVESTIGATOR)
  updateReturnCaseToAnalyst(
    @Param('idResearcher') idResearcher: number,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
  ): Promise<HttpException> {
    return this.researchersService.returnCaseToAnalyst(
      idCaseReportValidate,
      clientIp,
      idResearcher,
    );
  }

  @Delete('deleteAssignedResearch/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST)
  deleteAssignedResearch(@Param('id') id: number): Promise<HttpException> {
    return this.researchersService.deleteAssignedResearcher(id);
  }
}
