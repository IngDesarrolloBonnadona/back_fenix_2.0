import { Module } from '@nestjs/common';
import { RiskTypeService } from './services/risk-type.service';
import { RiskTypeController } from './controllers/risk-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskType } from './entities/risk-type.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RiskType]), UserModule],
  controllers: [RiskTypeController],
  providers: [RiskTypeService, PermissionGuard],
  exports: [RiskTypeService],
})
export class RiskTypeModule {}
