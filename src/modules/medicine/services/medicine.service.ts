import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine as MedicineEntity } from '../entities/medicine.entity';
import { QueryRunner, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(MedicineEntity)
    private readonly medicineRepository: Repository<MedicineEntity>,
  ) {}

  async createMedicineTransaction(
    medicines: CreateMedicineDto[],
    caseId: string,
    queryRunner: QueryRunner,
  ) {
    const existingMedicines = await this.medicineRepository.find({
      where: { med_case_id_fk: caseId },
    });

    if (existingMedicines.length > 0) {
      await queryRunner.manager.remove(existingMedicines);
    }

    for (const medicine of medicines) {
      const med = this.medicineRepository.create({
        ...medicine,
        med_case_id_fk: caseId,
      });

      await queryRunner.manager.save(med);
    }
  }

  async createMedicine(
    createMedicineDto: CreateMedicineDto,
  ): Promise<MedicineEntity> {
    const medicine = this.medicineRepository.create(createMedicineDto);
    return await this.medicineRepository.save(medicine);
  }

  async findAllMedicines(): Promise<MedicineEntity[]> {
    const medicines = await this.medicineRepository.find({
      relations: {
        // caseReportOriginal: true,
      },
    });

    if (medicines.length === 0) {
      throw new HttpException(
        'No se encontró la lista de medicamentos',
        HttpStatus.NO_CONTENT,
      );
    }

    return medicines;
  }

  async findOneMedicine(id: number): Promise<MedicineEntity> {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
      relations: {
        // caseReportOriginal: true,
      },
    });

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NO_CONTENT,
      );
    }

    return medicine;
  }

  async updateMedicine(id: number, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOneMedicine(id);
    const result = await this.medicineRepository.update(
      medicine.id,
      updateMedicineDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el medicamento`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteMedicine(id: number) {
    const medicine = await this.findOneMedicine(id);
    const result = await this.medicineRepository.softDelete(medicine.id);

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

  async deleteMedicinesByCaseId(caseId: string) {
    const findListMedicines = await this.medicineRepository.find({
      where: {
        med_case_id_fk: caseId,
      },
    });

    if (findListMedicines.length > 0) {
      for (const medicine of findListMedicines) {
        const result = await this.medicineRepository.softDelete(medicine.id);

        if (result.affected === 0) {
          return new HttpException(
            `No se pudo eliminar el medicamento.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      return;
    }
  }
}
