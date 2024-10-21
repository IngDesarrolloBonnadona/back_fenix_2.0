import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { Medicine } from '../entities/medicine.entity';
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

  @Patch('/updateMedicine/:id')
  updateMedicine(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.updateMedicine(id, updateMedicineDto);
  }

  @Delete('/DeleteMedicine/:id')
  DeleteMedicine(@Param('id') id: number) {
    return this.medicineService.deleteMedicine(id);
  }
}
