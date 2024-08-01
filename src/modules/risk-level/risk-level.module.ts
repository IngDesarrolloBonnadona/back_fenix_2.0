import { Module } from '@nestjs/common';
import { RiskLevelService } from './services/risk-level.service';
import { RiskLevelController } from './controllers/risk-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskLevel } from './entities/risk-level.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RiskLevel]), UserModule],
  controllers: [RiskLevelController],
  providers: [RiskLevelService, PermissionGuard],
  exports: [RiskLevelService],
})
export class RiskLevelModule {}
