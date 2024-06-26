import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventTypeModule } from '../event-type/event-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]),
  EventTypeModule
],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
