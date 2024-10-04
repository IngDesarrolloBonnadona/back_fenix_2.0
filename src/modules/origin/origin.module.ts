import { Module } from '@nestjs/common';
import { OriginService } from './services/origin.service';
import { OriginController } from './controllers/origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Origin } from './entities/origin.entity';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Origin]), UserModule],
  controllers: [OriginController],
  providers: [OriginService, PermissionGuard],
  exports: [OriginService],
})
export class OriginModule {}
