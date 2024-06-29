import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/createRole')
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('/listRoles')
  listRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Get('/findRole/:id')
  findRole(@Param('id') id: number) {
    return this.roleService.findOneRole(id);
  }

  @Get('/findRoleByName')
  findRoleByName(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.findRoleByName(createRoleDto);
  }

  @Patch('/updateRole/:id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('/deleteRole/:id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
