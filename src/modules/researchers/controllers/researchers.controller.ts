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
import { ResearchersService } from '../services/researchers.service';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { Researcher } from '../entities/researchers.entity';
import { UpdateResearcherDto } from '../dto/update-researcher.dto';

@ApiTags('researchers')
@Controller('researchers')
export class ResearchersController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filterResearchers')
  filterResearchers(
    @Query('empImmediateBoss') empImmediateBoss?: string,
    @Query('empPosition') empPosition?: string,
  ): Promise<FilterResearcherDto[]> {
    const filter = new FilterResearcherDto();
    filter.empImmediateBoss = empImmediateBoss;
    filter.empPosition = empPosition;

    return this.researchersService.filterResearchers(filter);
  }

  @Get('findAssignedResearch/:id')
  findAssignedResearch(@Param('id') id: number): Promise<Researcher> {
    return this.researchersService.findOneAssignedResearch(id);
  }

  @Get('/summaryReportsMyAssignedCases')
  async summaryReportsMyAssignedCases(
    @Query('filingNumber') filingNumber?: string,
    @Query('patientDoc') patientDoc?: string,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('eventId') eventId?: number,
    @Query('priorityId') priorityId?: number,
  ) {
    return await this.researchersService.summaryReportsMyAssignedCases(
      filingNumber,
      patientDoc,
      caseTypeId,
      eventId,
      priorityId,
    );
  }

  @Get('/summaryReportsMyCasesByCharacterization')
  async summaryReportsMyCasesByCharacterization(
    @Query('filingNumber') filingNumber?: string,
    @Query('statusMovementId') statusMovementId?: number,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('eventId') eventId?: number,
    @Query('priorityId') priorityId?: number,
  ) {
    return await this.researchersService.summaryReportsMyCasesByCharacterization(
      filingNumber,
      statusMovementId,
      caseTypeId,
      eventId,
      priorityId,
    );
  }

  @Post('createAssingResearcher/:idAnalyst')
  createAssingResearcher(
    @Body() createResearcherDto: CreateResearcherDto,
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
    @Body() updateResearcherDto: UpdateResearcherDto,
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
