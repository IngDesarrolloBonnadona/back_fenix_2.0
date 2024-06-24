import { Module } from '@nestjs/common';
import { EventTypeService } from './services/event-type.service';
import { EventTypeController } from './controllers/event-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';
import { CaseTypeModule } from '../case-type/case-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventType]), 
  CaseTypeModule,
],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
