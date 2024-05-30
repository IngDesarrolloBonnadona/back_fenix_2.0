import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition')
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Get('/listPositions')
  findAll() {
    return this.positionService.findAll();
  }

  @Get('/findPostition/:id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Patch('/updatePosition/:id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.update(+id, updatePositionDto);
  }

  @Delete('/deletePosition/:id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
