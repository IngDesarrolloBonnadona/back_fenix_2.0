import { Module } from '@nestjs/common';
import { SeverityClasificationService } from './services/severity-clasification.service';
import { SeverityClasificationController } from './controllers/severity-clasification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeverityClasification } from './entities/severity-clasification.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeverityClasification]), UserModule],
  controllers: [SeverityClasificationController],
  providers: [SeverityClasificationService, PermissionGuard],
  exports: [SeverityClasificationService],
})
export class SeverityClasificationModule {}
