import { Module } from '@nestjs/common';
import { RoleResponseTimeService } from './services/role-response-time.service';
import { RoleResponseTimeController } from './controllers/role-response-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleResponseTime } from './entities/role-response-time.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleResponseTime]),
    SeverityClasificationModule,
    RoleModule
  ],
  controllers: [RoleResponseTimeController],
  providers: [RoleResponseTimeService],
})
export class RoleResponseTimeModule {}
