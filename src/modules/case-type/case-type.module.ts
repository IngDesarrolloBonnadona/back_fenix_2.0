import { Module } from '@nestjs/common';
import { CaseTypeService } from './services/case-type.service';
import { CaseTypeController } from './controllers/case-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseType } from './entities/case-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseType])
  ],
  controllers: [CaseTypeController],
  providers: [CaseTypeService],
  exports: [CaseTypeService]
})
export class CaseTypeModule {}
