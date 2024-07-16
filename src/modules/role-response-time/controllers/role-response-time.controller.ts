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
import { RoleResponseTimeService } from '../services/role-response-time.service';
import { CreateRoleResponseTimeDto } from '../dto/create-role-response-time.dto';
import { UpdateRoleResponseTimeDto } from '../dto/update-role-response-time.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleResponseTime } from '../entities/role-response-time.entity';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('role-response-time')
@Controller('role-response-time')
@UseGuards(PermissionGuard)
export class RoleResponseTimeController {
  constructor(
    private readonly roleResponseTimeService: RoleResponseTimeService,
  ) {}

  @Post('/createRoleResponseTime/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  createRoleResponseTime(
    @Body() createRoleResponseTimeDto: CreateRoleResponseTimeDto,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.createRoleResponseTime(
      createRoleResponseTimeDto,
    );
  }

  @Get('/listRoleResponseTimes/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  listRoleResponseTimes(): Promise<RoleResponseTime[]> {
    return this.roleResponseTimeService.findAllRoleResponseTimes();
  }

  @Get('/findRoleResponseTime/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  findRoleResponseTime(@Param('id') id: number): Promise<RoleResponseTime> {
    return this.roleResponseTimeService.findOnefindAllRoleResponseTime(id);
  }

  @Patch('/updateRoleResponseTime/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  updateCreateRoleResponseTime(
    @Param('id') id: number,
    @Body() updateCaseResponseTimeDto: UpdateRoleResponseTimeDto,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.updateRoleResponseTime(
      id,
      updateCaseResponseTimeDto,
    );
  }

  @Delete('/deleteRoleResponseTime/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteCreateRoleResponseTime(
    @Param('id') id: number,
  ): Promise<HttpException> {
    return this.roleResponseTimeService.deleteRoleResponseTime(id);
  }
}
