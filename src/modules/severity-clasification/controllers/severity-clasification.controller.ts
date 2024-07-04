import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { SeverityClasificationService } from '../services/severity-clasification.service';
import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';
import { SeverityClasification } from '../entities/severity-clasification.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('severity-clasification')
@Controller('severity-clasification')
export class SeverityClasificationController {
  constructor(
    private readonly severityClasificationService: SeverityClasificationService,
  ) {}

  @Post('/createSeverityClasification')
  createSeverityClasification(
    @Body() createSeverityClasificationDto: CreateSeverityClasificationDto,
  ): Promise<HttpException> {
    return this.severityClasificationService.createSeverityClasification(
      createSeverityClasificationDto,
    );
  }

  @Get('/listSeverityClasifications')
  listSeverityClasifications(): Promise<SeverityClasification[]> {
    return this.severityClasificationService.findAllSeverityClasifications();
  }

  @Get('findSeverityClasification/:id')
  findSeverityClasification(@Param('id') id: number): Promise<SeverityClasification> {
    return this.severityClasificationService.findOneSeverityClasification(id);
  }

  @Patch('/updateSeverityClasification/:id')
  updateSeverityClasification(
    @Param('id') id: number,
    @Body() updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ): Promise<HttpException> {
    return this.severityClasificationService.updateSeverityClasification(
      id,
      updateSeverityClasificationDto,
    );
  }

  @Delete('/deleteSeverityClasification/:id')
  deleteSeverityClasification(@Param('id') id: number): Promise<HttpException> {
    return this.severityClasificationService.deleteSeverityClasification(id);
  }
}
