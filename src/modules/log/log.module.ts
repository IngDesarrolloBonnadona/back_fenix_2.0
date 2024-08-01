import { Module } from '@nestjs/common';
import { LogService } from './services/log.service';
import { LogController } from './controllers/log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), UserModule],
  controllers: [LogController],
  providers: [LogService, PermissionGuard],
  exports: [LogService],
})
export class LogModule {}
