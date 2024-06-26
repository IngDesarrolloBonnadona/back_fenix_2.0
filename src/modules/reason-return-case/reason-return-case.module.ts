import { Module } from '@nestjs/common';
import { ReasonReturnCaseService } from './services/reason-return-case.service';
import { ReasonReturnCaseController } from './controllers/reason-return-case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonReturnCase } from './entities/reason-return-case.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonReturnCase]), RoleModule],
  controllers: [ReasonReturnCaseController],
  providers: [ReasonReturnCaseService],
})
export class ReasonReturnCaseModule {}
