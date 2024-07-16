import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventTypeModule } from '../event-type/event-type.module';
import { PermissionGuard } from 'src/guards/permission.guard';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), EventTypeModule, UserModule],
  controllers: [EventController],
  providers: [EventService, PermissionGuard],
  exports: [EventService],
})
export class EventModule {}
