import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OriginService } from '../services/origin.service';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { Origin } from '../entities/origin.entity';

@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post('/createOrigin')
  createOrigin(@Body() createOriginDto: CreateOriginDto): Promise<Origin> {
    return this.originService.createOrigin(createOriginDto);
  }

  @Get('/listOrigins')
  listOrigins(): Promise<Origin[]> {
    return this.originService.findAllOrigins();
  }

  @Get('/findOrigin/:id')
  findOrigin(@Param('id') id: number): Promise<Origin> {
    return this.originService.findOneOrigin(id);
  }

  @Patch('/updateOrigin/:id')
  updateOrigin(@Param('id') id: number, @Body() updateOriginDto: UpdateOriginDto): Promise<Origin> {
    return this.originService.updateOrigin(id, updateOriginDto);
  }

  @Delete('/deleteOrigin/:id')
  async deleteOrigin(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.originService.deleteOrigin(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
