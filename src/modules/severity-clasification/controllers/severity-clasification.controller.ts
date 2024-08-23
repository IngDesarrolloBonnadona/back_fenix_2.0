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
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

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
  ) {
    return this.severityClasificationService.createSeverityClasification(
      createSeverityClasificationDto,
    );
  }

  @Get('/listSeverityClasifications/')
  listSeverityClasifications() {
    return this.severityClasificationService.findAllSeverityClasifications();
  }

  @Get('findSeverityClasification/:id/')
  findSeverityClasification(
    @Param('id') id: number,
  ) {
    return this.severityClasificationService.findOneSeverityClasification(id);
  }

  @Patch('/updateSeverityClasification/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateSeverityClasification(
    @Param('id') id: number,
    @Body() updateSeverityClasificationDto: UpdateSeverityClasificationDto,
  ) {
    return this.severityClasificationService.updateSeverityClasification(
      id,
      updateSeverityClasificationDto,
    );
  }

  @Delete('/deleteSeverityClasification/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteSeverityClasification(@Param('id') id: number) {
    return this.severityClasificationService.deleteSeverityClasification(id);
  }
}
