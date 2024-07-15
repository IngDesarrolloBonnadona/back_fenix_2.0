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
import { RolePermissionService } from '../services/role-permission.service';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolePermission } from '../entities/role-permission.entity';

@ApiTags('role')
@Controller('role')
export class RolePermissionController {
  constructor(private readonly roleService: RolePermissionService) {}

  @Post('/createRole')
  createRole(
    @Body() createRoleDto: CreateRolePermissionDto,
  ): Promise<HttpException> {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('/listRoles')
  listRoles(): Promise<RolePermission[]> {
    return this.roleService.findAllRoles();
  }

  @Get('/findRole/:id')
  findRole(@Param('id') id: number): Promise<RolePermission> {
    return this.roleService.findOneRole(id);
  }

  @Get('/findRoleByName')
  findRoleByName(
    @Body() createRoleDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    return this.roleService.findRoleByName(createRoleDto);
  }

  @Patch('/updateRole/:id')
  updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRolePermissionDto,
  ): Promise<HttpException> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('/deleteRole/:id')
  deleteRole(@Param('id') id: number): Promise<HttpException> {
    return this.roleService.deleteRole(id);
  }
}
