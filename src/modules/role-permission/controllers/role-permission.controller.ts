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
import { RolePermissionService } from '../services/role-permission.service';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolePermission } from '../entities/role-permission.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('role-permission')
@Controller('role-permission')
@UseGuards(PermissionGuard)
export class RolePermissionController {
  constructor(private readonly roleService: RolePermissionService) {}

  @Post('/createRole/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  createRole(@Body() createRoleDto: CreateRolePermissionDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('/listRoles/')
  listRoles() {
    return this.roleService.findAllRoles();
  }

  @Get('/findRole/:id/')
  findRole(@Param('id') id: number) {
    return this.roleService.findOneRole(id);
  }

  @Get('/findRoleByName/')
  findRoleByName(
    @Body() createRoleDto: CreateRolePermissionDto,
  ) {
    return this.roleService.findRoleByName(createRoleDto);
  }

  @Patch('/updateRole/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRolePermissionDto,
  ) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('/deleteRole/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
