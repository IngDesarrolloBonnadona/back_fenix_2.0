import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicalResearchFailedMeasuresService } from '../services/clinical-research-failed-measures.service';
import { CreateClinicalResearchFailedMeasureDto } from '../dto/create-clinical-research-failed-measure.dto';
import { UpdateClinicalResearchFailedMeasureDto } from '../dto/update-clinical-research-failed-measure.dto';

@Controller('clinical-research-failed-measures')
export class ClinicalResearchFailedMeasuresController {
  constructor(
    private readonly clinicalResearchFailedMeasuresService: ClinicalResearchFailedMeasuresService,
  ) {}

  @Post()
  create(
    @Body()
    createClinicalResearchFailedMeasureDto: CreateClinicalResearchFailedMeasureDto,
  ) {
    return this.clinicalResearchFailedMeasuresService.create(
      createClinicalResearchFailedMeasureDto,
    );
  }

  @Get()
  findAll() {
    return this.clinicalResearchFailedMeasuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalResearchFailedMeasuresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateClinicalResearchFailedMeasureDto: UpdateClinicalResearchFailedMeasureDto,
  ) {
    return this.clinicalResearchFailedMeasuresService.update(
      +id,
      updateClinicalResearchFailedMeasureDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalResearchFailedMeasuresService.remove(+id);
  }
}
