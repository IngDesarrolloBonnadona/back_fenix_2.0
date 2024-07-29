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
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { ApiTags } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('position')
@Controller('position')
@UseGuards(PermissionGuard)
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createPosition(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<HttpException> {
    return this.positionService.createPosition(createPositionDto);
  }

  @Post('/synchronizePositions')
  syncronizePositions(): Promise<number> {
    return this.positionService.synchronizePositions();
  }

  @Get('/listPositions')
  listPositions(): Promise<Position[]> {
    return this.positionService.findAllPosition();
  }

  @Get('/findPosition/:id')
  findPosition(@Param('id') id: number): Promise<Position> {
    return this.positionService.findOnePosition(id);
  }

  @Get('/findEmployeeByCode/:code')
  findEmployeeByCode(@Param('code') code: number) {
    return this.positionService.findEmployeeByCode(code);
  }

  @Patch('/updateEnabledPosition/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateEnabledPosition(
    @Param('id') id: number,
    @Body() enabledPosition: UpdatePositionDto,
  ): Promise<HttpException> {
    return this.positionService.updateEnabledPosition(id, enabledPosition);
  }

  @Delete('/deletePosition/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  async deletePosition(@Param('id') id: number): Promise<HttpException> {
    return await this.positionService.deletePosition(id);
  }
}
