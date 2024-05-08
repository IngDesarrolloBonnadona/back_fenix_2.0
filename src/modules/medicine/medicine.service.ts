import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine as MedicineEntity } from './entities/medicine.entity';
import { Repository } from 'typeorm';

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
      throw new NotFoundException();
    }

    return medicines;
  }

  async findOne(id: number) {
    const medicine = await this.medicineRepository.findOne({ where: { id } })

    if (!medicine) {
      throw new NotFoundException();
    }

    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOne(id);

    if (!medicine) {
      throw new NotFoundException();
    }

    Object.assign(medicine, updateMedicineDto)

    medicine.med_fecha_actualizacion = new Date();
    
    return await this.medicineRepository.save(medicine);
  }

  async remove(id: number) {
    const medicine = await this.findOne(id);

    if (!medicine) {
      throw new NotFoundException();
    }

    medicine.med_fecha_eliminacion = new Date();
    medicine.med_estado = false;

    return await this.medicineRepository.save(medicine)
  }
}
