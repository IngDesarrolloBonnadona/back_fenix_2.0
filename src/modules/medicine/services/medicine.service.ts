import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine as MedicineEntity } from '../entities/medicine.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity> 
  ){}

  async createMedicine(createMedicineDto: CreateMedicineDto) {
    const medicine = this.medicineRepository.create(createMedicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async findAllMedicines() {
    const medicines = await this.medicineRepository.find()

    if (!medicines) {
      throw new HttpException(
        'No se encontró la lista de medicamentos',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicines;
  }

  async findOneMedicine(id: number) {
    const medicine = await this.medicineRepository.findOne({ where: { id } })

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicine;
  }

  async updateMedicine(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOneMedicine(id);

    Object.assign(medicine, updateMedicineDto)

    medicine.updateAt = new Date();
    
    return await this.medicineRepository.save(medicine);
  }

  async deleteMedicine(id: number) {
    const medicine = await this.findOneMedicine(id);
    const result = await this.medicineRepository.softDelete(medicine.id)

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el medicamento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
