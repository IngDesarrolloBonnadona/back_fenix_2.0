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
import { RiskTypeService } from '../services/risk-type.service';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';
import { RiskType } from '../entities/risk-type.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('risk-type')
@Controller('risk-type')
@UseGuards(PermissionGuard)
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}

  @Post('/createRisktype/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createRisktype(
    @Body() createRiskTypeDto: CreateRiskTypeDto,
  ): Promise<HttpException> {
    return this.riskTypeService.createRiskType(createRiskTypeDto);
  }

  @Get('/listRisktypes/')
  listRisktypes(): Promise<RiskType[]> {
    return this.riskTypeService.findAllRiskTypes();
  }

  @Get('/findRisktype/:id/')
  findRisktype(@Param('id') id: number): Promise<RiskType> {
    return this.riskTypeService.findOneRiskType(id);
  }

  @Patch('/updateRisktype/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateRisktype(
    @Param('id') id: number,
    @Body() updateRiskTypeDto: UpdateRiskTypeDto,
  ): Promise<HttpException> {
    return this.riskTypeService.updateRiskType(id, updateRiskTypeDto);
  }

  @Delete('/deleteRisktype/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteRisktype(@Param('id') id: number): Promise<HttpException> {
    return this.riskTypeService.deleteRiskType(id);
  }
}
