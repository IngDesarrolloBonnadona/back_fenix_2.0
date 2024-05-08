import { Module } from '@nestjs/common';
import { SubOriginService } from './sub-origin.service';
import { SubOriginController } from './sub-origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubOrigin } from './entities/sub-origin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubOrigin])
  ],
  controllers: [SubOriginController],
  providers: [SubOriginService],
})
export class SubOriginModule {}
