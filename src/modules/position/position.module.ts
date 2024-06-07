import { Module } from '@nestjs/common';
import { PositionService } from './services/position.service';
import { PositionController } from '../position/controllers/position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { HttpModule } from '@nestjs/axios';
import { HttpPositionService } from './http/http-position.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), HttpModule],
  controllers: [PositionController],
  providers: [PositionService, HttpPositionService],
  exports: [PositionService],
})
export class PositionModule {}
