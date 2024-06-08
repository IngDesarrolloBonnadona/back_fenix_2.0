import { Module } from '@nestjs/common';
import { SynergyService } from './services/synergy.service';
import { SynergyController } from './controllers/synergy.controller';

@Module({
  controllers: [SynergyController],
  providers: [SynergyService],
})
export class SynergyModule {}
