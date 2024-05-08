import { Module } from '@nestjs/common';
import { CaseTypeService } from './case-type.service';
import { CaseTypeController } from './case-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseType } from './entities/case-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CaseType])
  ],
  controllers: [CaseTypeController],
  providers: [CaseTypeService],
})
export class CaseTypeModule {}
