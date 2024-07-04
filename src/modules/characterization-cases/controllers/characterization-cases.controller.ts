import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
} from '@nestjs/common';
import { CharacterizationCasesService } from '../services/characterization-cases.service';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { CharacterizationCase } from '../entities/characterization-case.entity';

@ApiTags('characterization-cases')
@Controller('characterization-cases')
export class CharacterizationCasesController {
  constructor(
    private readonly characterizationCasesService: CharacterizationCasesService,
  ) {}

  @Post('/createCharacterizationCases')
  create(
    @Body() createCharacterizationCaseDto: CreateCharacterizationCaseDto,
  ): Promise<HttpException> {
    return this.characterizationCasesService.createCharacterization(
      createCharacterizationCaseDto,
    );
  }

  @Get('/listCharacterizations')
  listCharacterizations(): Promise<CharacterizationCase[]> {
    return this.characterizationCasesService.findAllCharacterizations();
  }

  @Get('/findCharacterization/:id')
  findCharacterization(@Param('id') id: number): Promise<CharacterizationCase> {
    return this.characterizationCasesService.findOneCharacterization(id);
  }

  @Patch('/updateCharacterization/:id')
  updateCharacterization(
    @Param('id') id: number,
    @Body() updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ): Promise<HttpException> {
    return this.characterizationCasesService.updateCharacterization(
      id,
      updateCharacterizationCaseDto,
    );
  }

  @Delete('/deleteCharacterization/:id')
  deleteCharacterization(@Param('id') id: number): Promise<HttpException> {
    return this.characterizationCasesService.deleteCharacterization(id);
  }
}
