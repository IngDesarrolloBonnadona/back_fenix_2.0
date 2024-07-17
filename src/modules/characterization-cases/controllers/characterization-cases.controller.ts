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
  UseGuards,
} from '@nestjs/common';
import { CharacterizationCasesService } from '../services/characterization-cases.service';
import { CreateCharacterizationCaseDto } from '../dto/create-characterization-case.dto';
import { UpdateCharacterizationCaseDto } from '../dto/update-characterization-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { CharacterizationCase } from '../entities/characterization-case.entity';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('characterization-cases')
@Controller('characterization-cases')
@UseGuards(PermissionGuard)
export class CharacterizationCasesController {
  constructor(
    private readonly characterizationCasesService: CharacterizationCasesService,
  ) {}

  @Post('/createCharacterizationCases/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  create(
    @Body() createCharacterizationCaseDto: CreateCharacterizationCaseDto,
  ): Promise<HttpException> {
    return this.characterizationCasesService.createCharacterization(
      createCharacterizationCaseDto,
    );
  }

  @Get('/listCharacterizations/')
  listCharacterizations(): Promise<CharacterizationCase[]> {
    return this.characterizationCasesService.findAllCharacterizations();
  }

  @Get('/findCharacterization/:id/')
  findCharacterization(@Param('id') id: number): Promise<CharacterizationCase> {
    return this.characterizationCasesService.findOneCharacterization(id);
  }

  @Patch('/updateCharacterization/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateCharacterization(
    @Param('id') id: number,
    @Body() updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ): Promise<HttpException> {
    return this.characterizationCasesService.updateCharacterization(
      id,
      updateCharacterizationCaseDto,
    );
  }

  @Delete('/deleteCharacterization/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteCharacterization(@Param('id') id: number): Promise<HttpException> {
    return this.characterizationCasesService.deleteCharacterization(id);
  }
}
