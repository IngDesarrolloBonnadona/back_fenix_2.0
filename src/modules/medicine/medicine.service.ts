import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine as MedicineEntity } from './entities/medicine.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity> 
  ){}

  async create(createMedicineDto: CreateMedicineDto) {
    const medicine = this.medicineRepository.create(createMedicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async findAll() {
    const medicines = await this.medicineRepository.find()

    if (!medicines) {
      throw new HttpException(
        'No se encontró la lista de medicamentos',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicines;
  }

  async findOne(id: number) {
    const medicine = await this.medicineRepository.findOne({ where: { id } })

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOne(id);

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(medicine, updateMedicineDto)

    medicine.med_fecha_actualizacion = new Date();
    
    return await this.medicineRepository.save(medicine);
  }

  async remove(id: number) {
    const medicine = await this.findOne(id);

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NOT_FOUND,
      );
    }

    medicine.med_fecha_eliminacion = new Date();
    medicine.med_estado = false;

    return await this.medicineRepository.save(medicine)
  }
}
