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
} from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { ApiTags } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';
import { EnabledPositionDto } from '../dto/enabled-position.dto';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition')
  createPosition(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionService.createPosition(createPositionDto);
  }

  @Post('/synchronizePositions')
  syncronizePositions() {
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

  @Patch('/updateEnabledPosition/:id')
  updateEnabledPosition(
    @Param('id') id: number,
    @Body() enabledPositionDto: EnabledPositionDto,
  ): Promise<HttpException> {
    return this.positionService.updateEnabledPosition(id, enabledPositionDto);
  }

  @Delete('/deletePosition/:id')
  async deletePosition(@Param('id') id: number): Promise<HttpException> {
    return await this.positionService.deletePosition(id);
  }
}
