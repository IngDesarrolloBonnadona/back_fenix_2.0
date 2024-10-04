import { Module } from '@nestjs/common';
import { MedicineService } from './services/medicine.service';
import { MedicineController } from './controllers/medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine])
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
