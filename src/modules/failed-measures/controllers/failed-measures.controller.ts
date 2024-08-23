import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { FailedMeasuresService } from '../services/failed-measures.service';
import { CreateFailedMeasureDto } from '../dto/create-failed-measure.dto';
import { UpdateFailedMeasureDto } from '../dto/update-failed-measure.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';
import { FailedMeasure } from '../entities/failed-measure.entity';

@ApiTags('failed-measures')
@Controller('failed-measures')
@UseGuards(PermissionGuard)
export class FailedMeasuresController {
  constructor(private readonly failedMeasuresService: FailedMeasuresService) {}

  @Post('/createFailedMeasure/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createFailedMeasure(@Body() createFailedMeasureDto: CreateFailedMeasureDto) {
    return this.failedMeasuresService.createFailedMeasure(
      createFailedMeasureDto,
    );
  }

  @Get('/listFailedMeasures/')
  listFailedMeasures() {
    return this.failedMeasuresService.findAllFailedMeasures();
  }

  @Get('/findFailedMeasure/:id/')
  findFailedMeasure(
    @Param('id') id: number,
  ) {
    return this.failedMeasuresService.findOneFailedMeasure(id);
  }

  @Patch('/updateFailedMeasure/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateFailedMeasure(
    @Param('id') id: number,
    @Body() updateFailedMeasureDto: UpdateFailedMeasureDto,
  ) {
    return this.failedMeasuresService.updateFailedMeasure(
      id,
      updateFailedMeasureDto,
    );
  }

  @Delete('/deleteFailedMeasure/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteFailedMeasure(@Param('id') id: number) {
    return this.failedMeasuresService.deleteFailedMeasure(id);
  }
}
