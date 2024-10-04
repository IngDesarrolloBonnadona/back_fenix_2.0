import { Module } from '@nestjs/common';
import { ReasonReturnCaseService } from './services/reason-return-case.service';
import { ReasonReturnCaseController } from './controllers/reason-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonReturnCase } from './entities/reason-return-case.entity';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReasonReturnCase]),
    RolePermissionModule,
    UserModule,
  ],
  controllers: [ReasonReturnCaseController],
  providers: [ReasonReturnCaseService, PermissionGuard],
  exports: [ReasonReturnCaseService],
})
export class ReasonReturnCaseModule {}
