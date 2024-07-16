import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ServiceController } from './controllers/service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { PermissionGuard } from 'src/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), UserModule],
  controllers: [ServiceController],
  providers: [ServiceService, PermissionGuard],
  exports: [ServiceService],
})
export class ServiceModule {}
