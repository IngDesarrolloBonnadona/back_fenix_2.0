import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { SubOrigin } from '../entities/sub-origin.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('sub-origin')
@Controller('sub-origin')
@UseGuards(PermissionGuard)
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post('/createSubOrigin/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  createSubOrigin(@Body() createSubOriginDto: CreateSubOriginDto) {
    return this.subOriginService.createSubOrigin(createSubOriginDto);
  }

  @Get('/listSubOrigins/')
  listSubOrigins() {
    return this.subOriginService.findAllSubOrigins();
  }

  @Get('/findSubOrigin/:id/')
  findSubOrigin(@Param('id') id: number) {
    return this.subOriginService.findOneSubOrigin(id);
  }

  @Get('/findSubOriginByOriginId/:originId')
  findSubOriginByOriginId(
    @Param('originId') originId: number,
  ) {
    return this.subOriginService.findSubOriginByOriginId(originId);
  }

  @Patch('/updateSubOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  updateSubOrigin(
    @Param('id') id: number,
    @Body() updateSubOriginDto: UpdateSubOriginDto,
  ) {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.PARAMETERIZER)
  deleteSubOrigin(@Param('id') id: number) {
    return this.subOriginService.deleteSubOrigin(id);
  }
}
