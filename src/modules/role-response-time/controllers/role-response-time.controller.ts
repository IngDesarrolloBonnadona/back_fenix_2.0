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
import { RoleResponseTimeService } from '../services/role-response-time.service';
import { CreateRoleResponseTimeDto } from '../dto/create-role-response-time.dto';
import { UpdateRoleResponseTimeDto } from '../dto/update-role-response-time.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleResponseTime } from '../entities/role-response-time.entity';

@ApiTags('role-response-time')
@Controller('role-response-time')
export class RoleResponseTimeController {
  constructor(
    private readonly roleResponseTimeService: RoleResponseTimeService,
  ) {}

  @Post('/createRoleResponseTime')
  createRoleResponseTime(
    @Body() createRoleResponseTimeDto: CreateRoleResponseTimeDto,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.createRoleResponseTime(
      createRoleResponseTimeDto,
    );
  }

  @Get('/listRoleResponseTimes')
  listRoleResponseTimes(): Promise<RoleResponseTime[]> {
    return this.roleResponseTimeService.findAllRoleResponseTimes();
  }

  @Get('/findRoleResponseTime/:id')
  findRoleResponseTime(@Param('id') id: number): Promise<RoleResponseTime> {
    return this.roleResponseTimeService.findOnefindAllRoleResponseTime(id);
  }

  @Patch('/updateRoleResponseTime/:id')
  updateCreateRoleResponseTime(
    @Param('id') id: number,
    @Body() updateCaseResponseTimeDto: UpdateRoleResponseTimeDto,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.updateRoleResponseTime(
      id,
      updateCaseResponseTimeDto,
    );
  }

  @Delete('/deleteRoleResponseTime/:id')
  deleteCreateRoleResponseTime(
    @Param('id') id: number,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.deleteRoleResponseTime(id);
  }
}
