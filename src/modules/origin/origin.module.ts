import { Module } from '@nestjs/common';
import { OriginService } from './services/origin.service';
import { OriginController } from './controllers/origin.controller';
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
