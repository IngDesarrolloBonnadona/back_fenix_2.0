import { Injectable } from '@nestjs/common';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { HttpResearchersService } from '../http/http-researchers.service';


@Injectable()
export class ResearchersService {
  constructor(
    private readonly httpResearchersService: HttpResearchersService
  ) {}

  async filterResearchers(resFilter: Partial<FilterResearcherDto>) {
    const response = await this.httpResearchersService.getResearchersData();
    const researchers: FilterResearcherDto[] = response.data.data;

    return researchers.filter(research => {
      return (
        (!resFilter.empImmediateBoss || research.empImmediateBoss === resFilter.empImmediateBoss) &&
        (!resFilter.empPosition || research.empPosition === resFilter.empPosition)
      );
    });
  }
}
