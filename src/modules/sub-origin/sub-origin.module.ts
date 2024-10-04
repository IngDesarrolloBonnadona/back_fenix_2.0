import { Module } from '@nestjs/common';
import { SubOriginService } from './services/sub-origin.service';
import { SubOriginController } from './controllers/sub-origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubOrigin } from './entities/sub-origin.entity';
import { OriginModule } from '../origin/origin.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubOrigin]), OriginModule, UserModule],
  controllers: [SubOriginController],
  providers: [SubOriginService, PermissionGuard],
  exports: [SubOriginService],
})
export class SubOriginModule {}
