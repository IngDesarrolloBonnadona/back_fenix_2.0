import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { SeverityClasificationService } from '../services/severity-clasification.service';
import { CreateSeverityClasificationDto } from '../dto/create-severity-clasification.dto';
import { UpdateSeverityClasificationDto } from '../dto/update-severity-clasification.dto';
import { SeverityClasification } from '../entities/severity-clasification.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('severity-clasification')
@Controller('severity-clasification')
@UseGuards(PermissionGuard)
export class SeverityClasificationController {
  constructor(
    private readonly severityClasificationService: SeverityClasificationService,
  ) {}

  @Post('/createSeverityClasification/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createSeverityClasification(
    @Body() createSeverityClasificationDto: CreateSeverityClasificationDto,
  ): Promise<HttpException> {
    return this.severityClasificationService.createSeverityClasification(
      createSeverityClasificationDto,
    );
  }

  @Get('/listSeverityClasifications/')
  listSeverityClasifications(): Promise<SeverityClasification[]> {
    return this.severityClasificationService.findAllSeverityClasifications();
  }

  @Get('findSeverityClasification/:id/')
  findSeverityClasification(@Param('id') id: number): Promise<SeverityClasification> {
    return this.severityClasificationService.findOneSeverityClasification(id);
  }

  @Patch('/updateSeverityClasification/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateSeverityClasification(
    @Param('id') id: number,
    @Body() updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ): Promise<HttpException> {
    return this.severityClasificationService.updateSeverityClasification(
      id,
      updateSeverityClasificationDto,
    );
  }

  @Delete('/deleteSeverityClasification/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteSeverityClasification(@Param('id') id: number): Promise<HttpException> {
    return this.severityClasificationService.deleteSeverityClasification(id);
  }
}
