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
import { UpdatePositionDto } from '../dto/update-position.dto';
import { ApiTags } from '@nestjs/swagger';
import { Position } from '../entities/position.entity';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition')
  createPosition(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get('/listPositions')
  listPositions(): Promise<Position[]> {
    return this.positionService.findAllPosition();
  }

  @Get('/findPosition/:id')
  findPosition(@Param('id') id: number): Promise<Position> {
    return this.positionService.findOnePosition(id);
  }

  @Put('/updatePosition/:id')
  updatePosition(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<HttpException> {
    return this.positionService.updatePosition(id, updatePositionDto);
  }

  @Delete('/deletePosition/:id')
  async deletePosition(@Param('id') id: number): Promise<HttpException> {
    return await this.positionService.deletePosition(id);
  }
}
