import { Controller, Get, Query } from '@nestjs/common';
import { ResearchersService } from '../services/researchers.service';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('researchers')
@Controller('researchers')
export class ResearchersController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filter')
  async filterResearchers(
    @Query('empImmediateBoss') empImmediateBoss?: string,
    @Query('empPosition') empPosition?: string
  ) {
    const filter: Partial<FilterResearcherDto> = {
      empImmediateBoss,
      empPosition
    };

    return this.researchersService.filterResearchers(filter);
  }
}
