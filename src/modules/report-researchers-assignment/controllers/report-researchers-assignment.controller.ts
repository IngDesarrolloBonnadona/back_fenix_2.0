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
} from '@nestjs/common';
import { ResearchersService } from '../services/report-researchers-assignment.service';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { ReportResearcherAssignment } from '../entities/report-researchers-assignment.entity';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { QueryReportResearchersAssignmentDto } from '../dto/query-report-researcher-assignment.dto';

@ApiTags('report-researchers-assignment')
@Controller('report-researchers-assignment')
export class ReportResearchersAssignmentController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filterResearchers')
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

  @Get('/summaryReportsMyAssignedCases')
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

  @Get('/summaryReportsMyCasesByCharacterization')
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

  @Post('createAssingResearcher/:idAnalyst')
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

  @Patch('updateReAssignedResearch/:idAnalyst/:idCaseReportValidate')
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

  @Patch('updateReturnCaseToAnalyst/:idResearcher/:idCaseReportValidate')
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

  @Delete('deleteAssignedResearch/:id')
  deleteAssignedResearch(@Param('id') id: number): Promise<HttpException> {
    return this.researchersService.deleteAssignedResearcher(id);
  }
}
