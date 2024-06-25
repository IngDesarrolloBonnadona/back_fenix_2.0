import { Module } from '@nestjs/common';
import { CharacterizationCasesService } from './services/characterization-cases.service';
import { CharacterizationCasesController } from './controllers/characterization-cases.controller';

@Module({
  controllers: [CharacterizationCasesController],
  providers: [CharacterizationCasesService],
})
export class CharacterizationCasesModule {}
