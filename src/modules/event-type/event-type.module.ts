import { Module } from '@nestjs/common';
import { EventTypeService } from './services/event-type.service';
import { EventTypeController } from './controllers/event-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';
import { CaseTypeModule } from '../case-type/case-type.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventType]), CaseTypeModule, UserModule],
  controllers: [EventTypeController],
  providers: [EventTypeService, PermissionGuard],
  exports: [EventTypeService],
})
export class EventTypeModule {}
