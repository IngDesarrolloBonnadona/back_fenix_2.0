import { Module } from '@nestjs/common';
import { ReasonReturnCaseService } from './services/reason-return-case.service';
import { ReasonReturnCaseController } from './controllers/reason-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonReturnCase } from './entities/reason-return-case.entity';
import { RolePermissionModule } from '../role-permission/role-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonReturnCase]), RolePermissionModule],
  controllers: [ReasonReturnCaseController],
  providers: [ReasonReturnCaseService],
  exports: [ReasonReturnCaseService],
})
export class ReasonReturnCaseModule {}
