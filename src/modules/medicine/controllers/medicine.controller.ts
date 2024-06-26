import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { Medicine } from '../entities/medicine.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('/createMedicine')
  createMedicine(@Body() createMedicineDto: CreateMedicineDto): Promise<Medicine> {
    return this.medicineService.createMedicine(createMedicineDto);
  }

  @Get('/listMedicines')
  listMedicines(): Promise<Medicine[]> {
    return this.medicineService.findAllMedicines();
  }

  @Get('/findMedicine/:id')
  findMedicine(@Param('id') id: number): Promise<Medicine> {
    return this.medicineService.findOneMedicine(id);
  }

  @Patch('/updateMedicine/:id')
  updateMedicine(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto): Promise<HttpException> {
    return this.medicineService.updateMedicine(id, updateMedicineDto);
  }

  @Delete('/DeleteMedicine/:id')
  DeleteMedicine(@Param('id') id: number): Promise<HttpException> {
    return this.medicineService.deleteMedicine(id);
  }
}
