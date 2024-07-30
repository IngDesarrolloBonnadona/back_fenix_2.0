import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicalResearchInfluencingFactorService } from '../services/clinical-research-influencing-factor.service';
import { CreateClinicalResearchInfluencingFactorDto } from '../dto/create-clinical-research-influencing-factor.dto';

@Controller('clinical-research-influencing-factor')
export class ClinicalResearchInfluencingFactorController {
  constructor(
    private readonly clinicalResearchInfluencingFactorService: ClinicalResearchInfluencingFactorService,
  ) {}

  // @Post()
  // create(
  //   @Body()
  //   createClinicalResearchInfluencingFactorDto: CreateClinicalResearchInfluencingFactorDto[],
  // ) {
  //   return this.clinicalResearchInfluencingFactorService.createClinicalResearchInfluencingFactorTransaction(
  //     createClinicalResearchInfluencingFactorDto,
  //   );
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalResearchInfluencingFactorService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalResearchInfluencingFactorService.remove(+id);
  }
}
