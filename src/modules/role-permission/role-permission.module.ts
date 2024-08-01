import { Module } from '@nestjs/common';
import { RolePermissionService } from './services/role-permission.service';
import { RolePermissionController } from './controllers/role-permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission]), UserModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService, PermissionGuard],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
