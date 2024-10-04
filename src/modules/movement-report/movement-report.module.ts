import { Module } from '@nestjs/common';
import { MovementReportService } from './services/movement-report.service';
import { MovementReportController } from './controllers/movement-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementReport } from './entities/movement-report.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovementReport]), UserModule],
  controllers: [MovementReportController],
  providers: [MovementReportService, PermissionGuard],
  exports: [MovementReportService],
})
export class MovementReportModule {}
