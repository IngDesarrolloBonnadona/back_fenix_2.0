import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';

@Controller('researchers')
export class ResearchersController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Post()
  create(@Body() createResearcherDto: CreateResearcherDto) {
    return this.researchersService.create(createResearcherDto);
  }

  @Get()
  findAll() {
    return this.researchersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResearcherDto: UpdateResearcherDto) {
    return this.researchersService.update(+id, updateResearcherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchersService.remove(+id);
  }
}
