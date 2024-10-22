import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateMedicineDto } from '../dto/create-medicine.dto';

import { Medicine } from '../entities/medicine.entity';

import { QueryRunner, Repository } from 'typeorm';

import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

require('dotenv').config();

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,

    private readonly httpMedicineService: HttpService,
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
      await queryRunner.manager.softRemove(existingMedicines);
    }

    for (const medicine of medicines) {
      const med = this.medicineRepository.create({
        ...medicine,
        med_case_id_fk: caseId,
      });

      await queryRunner.manager.save(med);
    }
  }

  async findAllMedicines() {
    const medicines = await this.medicineRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if (medicines.length === 0) {
      throw new HttpException(
        'No se encontró la lista de medicamentos',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicines;
  }

  async findOneMedicine(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del medicamento es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const medicine = await this.medicineRepository.findOne({
      where: { id },
    });

    if (!medicine) {
      throw new HttpException(
        'No se encontró el medicamento',
        HttpStatus.NOT_FOUND,
      );
    }

    return medicine;
  }

  async findExternalMedidicinesQuery(
    medicine: string,
  ): Promise<AxiosResponse<any>> {
    const url = `${process.env.URL_MEDICINES}?medicine=${medicine}`;
    
    try {
      const response = await lastValueFrom(
        this.httpMedicineService.get(url, {
          headers: {
            'X-Authorization': process.env.X_TOKEN_VALUE_MEDICINES,
          },
        }),
      );
      
      if (response.status !== 200 || !response.data) {
        throw new HttpException(
          'Error al consultar la información del medicamento',
          HttpStatus.BAD_REQUEST,
        );
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error al conectar con el servidor externo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }

  async deleteMedicinesByCaseId(caseId: string) {
    if (!caseId) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
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
