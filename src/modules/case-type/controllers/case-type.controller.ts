import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CaseTypeService } from '../services/case-type.service';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { CaseType } from '../entities/case-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('case-type')
@Controller('case-type')
@UseGuards(PermissionGuard)
export class CaseTypeController {
  constructor(private readonly caseTypeService: CaseTypeService) {}

  @Post('/createCaseType/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createCaseType(
    @Body() createCaseTypeDto: CreateCaseTypeDto,
  ) {
    return this.caseTypeService.createCaseType(createCaseTypeDto);
  }

  @Get('/listCaseTypes/')
  listCaseTypes() {
    return this.caseTypeService.findAllCaseTypes();
  }

  @Get('/findCaseType/:id/')
  findCaseType(@Param('id') id: number) {
    return this.caseTypeService.findOneCaseType(id);
  }

  @Put('/updateCaseType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateCaseType(
    @Param('id') id: number,
    @Body() updateCaseTypeDto: UpdateCaseTypeDto,
  ) {
    return this.caseTypeService.updateCaseType(id, updateCaseTypeDto);
  }

  @Delete('/deleteCaseType/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteCaseType(@Param('id') id: number) {
    return this.caseTypeService.deleteCaseType(id);
  }
}
