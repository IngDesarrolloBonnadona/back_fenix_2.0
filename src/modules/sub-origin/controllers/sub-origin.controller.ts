import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { SubOrigin } from '../entities/sub-origin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sub-origin')
@Controller('sub-origin')
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post('/createSubOrigin')
  createSubOrigin(@Body() createSubOriginDto: CreateSubOriginDto): Promise<SubOrigin> {
    return this.subOriginService.createSubOrigin(createSubOriginDto);
  }

  @Get('/listSubOrigins')
  listSubOrigins(): Promise<SubOrigin[]> {
    return this.subOriginService.findAllSubOrigins();
  }

  @Get('/findSubOrigin/:id')
  findSubOrigin(@Param('id') id: number): Promise<SubOrigin> {
    return this.subOriginService.findOneSubOrigin(id);
  }

  @Get('/findSubOriginByOriginId/:originId')
  findSubOriginByOriginId(@Param('originId') originId: number): Promise<SubOrigin[]> {
    return this.subOriginService.findSubOriginByOriginId(originId);
  }

  @Patch('/updateSubOrigin/:id')
  updateSubOrigin(@Param('id') id: number, @Body() updateSubOriginDto: UpdateSubOriginDto): Promise<HttpException> {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id')
  deleteSubOrigin(@Param('id') id: number): Promise<HttpException> {
    return this.subOriginService.deleteSubOrigin(id);
  }
}
