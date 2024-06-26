import { Module } from '@nestjs/common';
import { PriorityService } from './services/priority.service';
import { PriorityController } from './controllers/priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Priority])
  ],
  controllers: [PriorityController],
  providers: [PriorityService],
  exports: [PriorityService],
})
export class PriorityModule {}
