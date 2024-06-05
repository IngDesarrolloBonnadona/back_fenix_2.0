import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

      const filteredResearchers = researchers.filter(research => {
        return (
          (!resFilter.empImmediateBoss || research.empImmediateBoss === resFilter.empImmediateBoss) &&
          (!resFilter.empPosition || research.empPosition === resFilter.empPosition)
        );
      });

      if (filteredResearchers.length === 0) {
        throw new HttpException(
          'No se encontraron investigadores que coincidan con los criterios de búsqueda.',
          HttpStatus.NOT_FOUND,
        );
      }

      return filteredResearchers;
  }
}
