import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClinicalResearchService } from '../services/clinical-research.service';
import { CreateClinicalResearchDto } from '../dto/create-clinical-research.dto';
import { UpdateClinicalResearchDto } from '../dto/update-clinical-research.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clinical-research')
@Controller('clinical-research')
export class ClinicalResearchController {
  constructor(
    private readonly clinicalResearchService: ClinicalResearchService,
  ) {}

  @Put('/saveProgressClinicalResearch/:id?')
  saveProgressClinicalResearch(
    @Body() createClinicalResearchDto: CreateClinicalResearchDto,
    @Param('id') id?: string
  ) {
    return this.clinicalResearchService.saveProgressClinicalResearch(
      createClinicalResearchDto,
      id
    );
  }

  @Get('/listClinicalResearchs/')
  listClinicalResearchs() {
    return this.clinicalResearchService.findAllClinicalResearchs();
  }

  @Get('/findClinicalResearch/:id')
  findClinicalResearch(@Param('id') id: string) {
    return this.clinicalResearchService.findOneClinicalResearch(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateClinicalResearchDto: UpdateClinicalResearchDto,
  // ) {
  //   return this.clinicalResearchService.update(id, updateClinicalResearchDto);
  // }

  @Delete('/deleteClinicalResearch/:id')
  deleteClinicalResearch(@Param('id') id: string) {
    return this.clinicalResearchService.deleteClinicalResearch(id);
  }
}
