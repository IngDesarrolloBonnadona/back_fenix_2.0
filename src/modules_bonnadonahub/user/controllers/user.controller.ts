import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userPermissionsService: UserService) {}

  @Get('/listPermissions/:userId')
  listPermissionsUser(@Param('userId') userId: string) {
    return this.userPermissionsService.getUserPermissions(userId);
  }
}
