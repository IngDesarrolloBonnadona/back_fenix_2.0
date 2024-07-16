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
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('log')
@Controller('log')
@UseGuards(PermissionGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  createLog(@Body() createLogDto: CreateLogDto): Promise<HttpException> {
    return this.logService.createLog(
      createLogDto.log_validatedcase_id_fk,
      createLogDto.log_user_id,
      createLogDto.log_ip,
      createLogDto.log_action,
    );
  }

  @Get('/listLogs/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  listLogs(): Promise<Log[]> {
    return this.logService.findAllLogs();
  }

  @Get('/findOneLog/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  findOneLog(@Param('id') id: number): Promise<Log> {
    return this.logService.findOneLog(id);
  }

  @Patch('/updateLog/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  updateLog(
    @Param('id') id: number,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<HttpException> {
    return this.logService.updateLog(id, updateLogDto);
  }

  @Delete('/deleteLog/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteLog(@Param('id') id: number): Promise<HttpException> {
    return this.logService.deleteLog(id);
  }
}
