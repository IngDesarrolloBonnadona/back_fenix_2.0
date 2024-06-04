import { Module } from '@nestjs/common';
import { PositionService } from './services/position.service';
import { PositionController } from '../position/controllers/position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position])
  ],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService]
})
export class PositionModule {}
