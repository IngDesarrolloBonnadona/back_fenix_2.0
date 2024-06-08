import { Module } from '@nestjs/common';
import { SynergyService } from './services/synergy.service';
import { SynergyController } from './controllers/synergy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Synergy } from './entities/synergy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Synergy])
  ],
  controllers: [SynergyController],
  providers: [SynergyService],
})
export class SynergyModule {}
