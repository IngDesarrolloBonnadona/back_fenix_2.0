import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { UpdateLogDto } from '../dto/update-log.dto';
import { Log } from '../entities/log.entity';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog')
  createLog(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logService.createLog(createLogDto);
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
  updateLog(@Param('id') id: number, @Body() updateLogDto: UpdateLogDto): Promise<Log> {
    return this.logService.updateLog(id, updateLogDto);
  }

  @Delete('/deleteLog/:id')
  deleteLog(@Param('id') id: number): Promise<void> {
    return this.logService.deleteLog(id);
  }
}
