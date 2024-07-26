import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicalResearchService } from '../services/clinical-research.service';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';

@Controller('clinical-research')
export class ClinicalResearchController {
  constructor(
    private readonly clinicalResearchService: ClinicalResearchService,
  ) {}

  @Post()
  create(@Body() createClinicalResearchDto: CreateClinicalResearchDto) {
    return this.clinicalResearchService.create(createClinicalResearchDto);
  }

  @Get()
  findAll() {
    return this.clinicalResearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalResearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicalResearchDto: UpdateClinicalResearchDto,
  ) {
    return this.clinicalResearchService.update(+id, updateClinicalResearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalResearchService.remove(+id);
  }
}
