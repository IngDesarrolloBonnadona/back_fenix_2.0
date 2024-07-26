import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RiskFactorService } from '../services/risk-factor.service';
import { CreateRiskFactorDto } from '../dto/create-risk-factor.dto';
import { UpdateRiskFactorDto } from '../dto/update-risk-factor.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('risk-factor')
@Controller('risk-factor')
@UseGuards(PermissionGuard)
export class RiskFactorController {
  constructor(private readonly riskFactorService: RiskFactorService) {}

  @Post('/createRiskFactor/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createRiskFactor(@Body() createRiskFactorDto: CreateRiskFactorDto) {
    return this.riskFactorService.createRiskFactor(createRiskFactorDto);
  }

  @Get('/listRiskFactor/')
  listRiskFactor() {
    return this.riskFactorService.findAllRiskFactors();
  }

  @Get('/findRiskFactor/:id')
  findRiskFactor(@Param('id') id: number) {
    return this.riskFactorService.findOneRiskFactor(id);
  }

  @Patch('/updateRiskFactor/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateRiskFactor(
    @Param('id') id: number,
    @Body() updateRiskFactorDto: UpdateRiskFactorDto,
  ) {
    return this.riskFactorService.updateRiskFactor(id, updateRiskFactorDto);
  }

  @Delete('/deleteRiskFactor/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteRiskFactor(@Param('id') id: number) {
    return this.riskFactorService.deleteRiskFactor(id);
  }
}