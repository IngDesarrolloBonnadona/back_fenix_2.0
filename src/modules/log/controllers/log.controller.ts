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
} from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { UpdateLogDto } from '../dto/update-log.dto';
import { Log } from '../entities/log.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog')
  createLog(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.createLog(
      createLogDto.log_validatedcase_id_fk,
      createLogDto.log_user_id,
      createLogDto.log_ip,
      createLogDto.log_action,
    );
  }

  @Get('/listLogs')
  listLogs(): Promise<Log[]> {
    return this.logService.findAllLogs();
  }

  @Get('/findOneLog/:id')
  findOneLog(@Param('id') id: number): Promise<Log> {
    return this.logService.findOneLog(id);
  }

  @Patch('/updateLog/:id')
  updateLog(
    @Param('id') id: number,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<HttpException> {
    return this.logService.updateLog(id, updateLogDto);
  }

  @Delete('/deleteLog/:id')
  deleteLog(@Param('id') id: number): Promise<HttpException> {
    return this.logService.deleteLog(id);
  }
}
