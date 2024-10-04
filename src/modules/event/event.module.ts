import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventTypeModule } from '../event-type/event-type.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { EventType } from '../event-type/entities/event-type.entity';
import { Unit } from '../unit/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType, Unit]), UserModule],
  controllers: [EventController],
  providers: [EventService, PermissionGuard],
  exports: [EventService],
})
export class EventModule {}
