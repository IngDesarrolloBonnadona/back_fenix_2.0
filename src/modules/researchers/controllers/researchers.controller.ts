import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchersService } from '../services/researchers.service';
import { FilterResearcherDto } from '../dto/filter-researcher.dto';

@Controller('researchers')
export class ResearchersController {
  constructor(private readonly researchersService: ResearchersService) {}


}
