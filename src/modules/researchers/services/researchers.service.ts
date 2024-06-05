import { Injectable } from '@nestjs/common';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';
import { HttpResearchersService } from '../http/http-researchers.service';


@Injectable()
export class ResearchersService {
  constructor(
    private readonly httpResearchersService: HttpResearchersService
  ) {}
}
