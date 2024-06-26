import { Module } from '@nestjs/common';
import { SeverityClasificationService } from './services/severity-clasification.service';
import { SeverityClasificationController } from './controllers/severity-clasification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeverityClasification } from './entities/severity-clasification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SeverityClasification])
  ],
  controllers: [SeverityClasificationController],
  providers: [SeverityClasificationService],
  exports: [SeverityClasificationService],
})
export class SeverityClasificationModule {}
