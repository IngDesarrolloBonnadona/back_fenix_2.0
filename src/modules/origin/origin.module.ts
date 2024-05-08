import { Module } from '@nestjs/common';
import { OriginService } from './origin.service';
import { OriginController } from './origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Origin } from './entities/origin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Origin])
  ],
  controllers: [OriginController],
  providers: [OriginService],
})
export class OriginModule {}
