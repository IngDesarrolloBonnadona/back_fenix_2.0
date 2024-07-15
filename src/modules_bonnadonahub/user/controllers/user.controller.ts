import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userPermissionsService: UserService) {}

  @Get('/listPermissions')
  listPermissionsUser(@Query('userId') userId: string): Promise<
    {
      nombre: string;
      authorized: boolean;
    }[]
  > {
    return this.userPermissionsService.getUserPermissions(userId);
  }
}
