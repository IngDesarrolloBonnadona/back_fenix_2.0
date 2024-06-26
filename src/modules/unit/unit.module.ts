import { Module } from '@nestjs/common';
import { UnitService } from './services/unit.service';
import { UnitController } from './controllers/unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Unit]), ServiceModule],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
