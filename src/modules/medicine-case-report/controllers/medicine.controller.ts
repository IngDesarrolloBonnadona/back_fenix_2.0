import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get('/listMedicines')
  listMedicines() {
    return this.medicineService.findAllMedicines();
  }

  @Get('/findMedicine/:id')
  findMedicine(@Param('id') id: number) {
    return this.medicineService.findOneMedicine(id);
  }

  @Get('/findExternalMedicine')
  async findExternalMedicine(@Query('medicine') medicine: string) {
    return this.medicineService.findExternalMedidicinesQuery(medicine)
  }

  @Delete('/DeleteMedicine/:id')
  DeleteMedicine(@Param('id') id: number) {
    return this.medicineService.deleteMedicine(id);
  }
}
