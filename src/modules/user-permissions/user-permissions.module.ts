import { Module } from '@nestjs/common';
import { UserPermissionsService } from './services/user-permissions.service';
import { UserPermissionsController } from './controllers/user-permissions.controller';

@Module({
  controllers: [UserPermissionsController],
  providers: [UserPermissionsService],
})
export class UserPermissionsModule {}
