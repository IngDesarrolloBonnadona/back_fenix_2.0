import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClinicalResearchInfluencingFactorService } from '../services/clinical-research-influencing-factor.service';
import { CreateClinicalResearchInfluencingFactorDto } from '../dto/create-clinical-research-influencing-factor.dto';

@Controller('clinical-research-influencing-factor')
export class ClinicalResearchInfluencingFactorController {
  constructor(
    private readonly clinicalResearchInfluencingFactorService: ClinicalResearchInfluencingFactorService,
  ) {}
}
