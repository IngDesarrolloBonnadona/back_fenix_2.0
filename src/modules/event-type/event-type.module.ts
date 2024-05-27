import { Module } from '@nestjs/common';
import { EventTypeService } from './services/event-type.service';
import { EventTypeController } from './controllers/event-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventType])
  ],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
