import { Body, Controller, Get, Ip, Param, Post, Query } from '@nestjs/common';
import { ResearchersService } from '../services/researchers.service';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateResearcherDto } from '../dto/create-researcher.dto';

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
  findAssignedResearch(@Param('id') id: number) {
    return this.researchersService.findOneAssignedResearch(id);
  }

  @Post('assingResearcher/:idAnalyst')
  createResearch(
    @Body() createResearcherDto: CreateResearcherDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: number,
  ) {
    return this.researchersService.assingResearcher(
      createResearcherDto,
      clientIp,
      idAnalyst,
    );
  }
}
