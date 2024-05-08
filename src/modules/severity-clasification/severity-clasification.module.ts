import { Module } from '@nestjs/common';
import { SeverityClasificationService } from './severity-clasification.service';
import { SeverityClasificationController } from './severity-clasification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeverityClasification } from './entities/severity-clasification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeverityClasification])
  ],
  controllers: [SeverityClasificationController],
  providers: [SeverityClasificationService],
})
export class SeverityClasificationModule {}
