import { Module } from '@nestjs/common';
import { RoleResponseTimeService } from './services/role-response-time.service';
import { RoleResponseTimeController } from './controllers/role-response-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleResponseTime } from './entities/role-response-time.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleResponseTime]),
    SeverityClasificationModule,
    RolePermissionModule,
    UserModule,
  ],
  controllers: [RoleResponseTimeController],
  providers: [RoleResponseTimeService, PermissionGuard],
})
export class RoleResponseTimeModule {}
