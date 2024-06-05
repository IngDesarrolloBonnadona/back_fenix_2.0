import { Module } from '@nestjs/common';
import { ResearchersService } from './services/researchers.service';
import { ResearchersController } from './controllers/researchers.controller';

@Module({
  controllers: [ResearchersController],
  providers: [ResearchersService],
})
export class ResearchersModule {}
