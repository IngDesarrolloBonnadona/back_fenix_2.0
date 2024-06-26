import { Module } from '@nestjs/common';
import { SubOriginService } from './services/sub-origin.service';
import { SubOriginController } from './controllers/sub-origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubOrigin } from './entities/sub-origin.entity';
import { OriginModule } from '../origin/origin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubOrigin]),
    OriginModule
  ],
  controllers: [SubOriginController],
  providers: [SubOriginService],
})
export class SubOriginModule {}
