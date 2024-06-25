import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterizationCasesService } from '../services/characterization-cases.service';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('characterization-cases')
@Controller('characterization-cases')
export class CharacterizationCasesController {
  constructor(private readonly characterizationCasesService: CharacterizationCasesService) {}

  @Post('/createCharacterizationCases')
  create(@Body() createCharacterizationCaseDto: CreateCharacterizationCaseDto) {
    return this.characterizationCasesService.createCharacterization(createCharacterizationCaseDto);
  }

  @Get()
  findAll() {
    return this.characterizationCasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterizationCasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterizationCaseDto: UpdateCharacterizationCaseDto) {
    return this.characterizationCasesService.update(+id, updateCharacterizationCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterizationCasesService.remove(+id);
  }
}
