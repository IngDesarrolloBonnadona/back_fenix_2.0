import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { SubOrigin } from '../entities/sub-origin.entity';

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

  @Patch('/updateSubOrigin/:id')
  updateSubOrigin(@Param('id') id: number, @Body() updateSubOriginDto: UpdateSubOriginDto): Promise<SubOrigin> {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id')
  deleteSubOrigin(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return this.subOriginService.deleteSubOrigin(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
