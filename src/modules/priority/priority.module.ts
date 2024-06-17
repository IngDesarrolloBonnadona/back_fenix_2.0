import { Module } from '@nestjs/common';
import { PriorityService } from './services/priority.service';
import { PriorityController } from './controllers/priority.controller';

@Module({
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule {}
