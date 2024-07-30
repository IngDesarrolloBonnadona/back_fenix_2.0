import { Module } from '@nestjs/common';
import { FailedMeasuresService } from './services/failed-measures.service';
import { FailedMeasuresController } from './controllers/failed-measures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FailedMeasure } from './entities/failed-measure.entity';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FailedMeasure]), UserModule],
  controllers: [FailedMeasuresController],
  providers: [FailedMeasuresService],
  exports: [FailedMeasuresService],
})
export class FailedMeasuresModule {}
