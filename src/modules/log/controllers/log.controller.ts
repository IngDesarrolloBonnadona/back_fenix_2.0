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
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { UpdateLogDto } from '../dto/update-log.dto';
import { Log } from '../entities/log.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('log')
@Controller('log')
@UseGuards(PermissionGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  createLog(@Body() createLogDto: CreateLogDto) {
    return this.logService.createLog(
      createLogDto.log_validatedcase_id_fk,
      createLogDto.log_user_id,
      createLogDto.log_ip,
      createLogDto.log_action,
    );
  }

  @Get('/listLogs/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  listLogs() {
    return this.logService.findAllLogs();
  }

  @Get('/findOneLog/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  findOneLog(@Param('id') id: number) {
    return this.logService.findOneLog(id);
  }

  @Delete('/deleteLog/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteLog(@Param('id') id: number) {
    return this.logService.deleteLog(id);
  }
}
