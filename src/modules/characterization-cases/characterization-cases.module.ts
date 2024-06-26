import { Module } from '@nestjs/common';
import { CharacterizationCasesService } from './services/characterization-cases.service';
import { CharacterizationCasesController } from './controllers/characterization-cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterizationCase } from './entities/characterization-case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterizationCase])],
  controllers: [CharacterizationCasesController],
  providers: [CharacterizationCasesService],
  exports: [CharacterizationCasesService],
})
export class CharacterizationCasesModule {}
