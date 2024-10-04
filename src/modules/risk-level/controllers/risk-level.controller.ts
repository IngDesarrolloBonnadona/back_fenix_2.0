import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RiskLevelService } from '../services/risk-level.service';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { RiskLevel } from '../entities/risk-level.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('risk-level')
@Controller('risk-level')
@UseGuards(PermissionGuard)
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Post('/createRiskLevel/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createRiskLevel(@Body() createRiskLevelDto: CreateRiskLevelDto) {
    return this.riskLevelService.createRiskLevel(createRiskLevelDto);
  }

  @Get('/listRiskLevels/')
  listRiskLevel() {
    return this.riskLevelService.findAllRiskLevel();
  }

  @Get('/findRiskLevel/:id/')
  findRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.findOneRiskLevel(id);
  }

  @Patch('/updateRiskLevel/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateRiskLevel(
    @Param('id') id: number,
    @Body() updateRiskLevelDto: UpdateRiskLevelDto,
  ) {
    return this.riskLevelService.updateRiskLevel(id, updateRiskLevelDto);
  }

  @Delete('/deleteRiskLevel/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.deleteRiskLevel(id);
  }
}
