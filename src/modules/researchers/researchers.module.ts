import { Module } from '@nestjs/common';
import { ResearchersService } from './services/researchers.service';
import { ResearchersController } from './controllers/researchers.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpResearchersService } from './http/http-researchers.service';

@Module({
  imports: [HttpModule],
  controllers: [ResearchersController],
  providers: [ResearchersService, HttpResearchersService],
})
export class ResearchersModule {}
