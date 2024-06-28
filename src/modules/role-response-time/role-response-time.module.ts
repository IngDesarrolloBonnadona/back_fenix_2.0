import { Module } from '@nestjs/common';
import { RoleResponseTimeService } from './services/role-response-time.service';
import { RoleResponseTimeController } from './controllers/role-response-time.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleResponseTime } from './entities/role-response-time.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleResponseTime]),
    SeverityClasificationModule,
  ],
  controllers: [RoleResponseTimeController],
  providers: [RoleResponseTimeService],
})
export class RoleResponseTimeModule {}
