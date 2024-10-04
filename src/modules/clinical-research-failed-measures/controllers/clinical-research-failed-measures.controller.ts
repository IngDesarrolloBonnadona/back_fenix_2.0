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
}
