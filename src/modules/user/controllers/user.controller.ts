import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user-permissions')
export class UserController {
  constructor(private readonly userPermissionsService: UserService) {}

  @Post()
  create(@Body() createUserPermissionDto: CreateUserDto) {
    return this.userPermissionsService.create(createUserPermissionDto);
  }

  @Get()
  findAll() {
    return this.userPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPermissionDto: UpdateUserDto,
  ) {
    return this.userPermissionsService.update(+id, updateUserPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermissionsService.remove(+id);
  }
}
