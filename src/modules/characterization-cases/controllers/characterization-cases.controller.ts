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
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('characterization-case')
@Controller('characterization-case')
@UseGuards(PermissionGuard)
export class CharacterizationCasesController {
  constructor(
    private readonly characterizationCasesService: CharacterizationCasesService,
  ) {}

  @Post('/createCharacterizationCase/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  create(
    @Body() createCharacterizationCaseDto: CreateCharacterizationCaseDto,
  ) {
    return this.characterizationCasesService.createCharacterization(
      createCharacterizationCaseDto,
    );
  }

  @Get('/listCharacterizationsCase/')
  listCharacterizations() {
    return this.characterizationCasesService.findAllCharacterizations();
  }

  @Get('/findCharacterizationCase/:id/')
  findCharacterization(@Param('id') id: number) {
    return this.characterizationCasesService.findOneCharacterization(id);
  }

  @Patch('/updateCharacterizationCase/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateCharacterization(
    @Param('id') id: number,
    @Body() updateCharacterizationCaseDto: UpdateCharacterizationCaseDto,
  ) {
    return this.characterizationCasesService.updateCharacterization(
      id,
      updateCharacterizationCaseDto,
    );
  }

  @Delete('/deleteCharacterization/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteCharacterization(@Param('id') id: number) {
    return this.characterizationCasesService.deleteCharacterization(id);
  }
}
