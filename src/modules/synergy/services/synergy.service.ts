import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { UpdateSynergyDto } from '../dto/update-synergy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Synergy as SynergyEntity } from '../entities/synergy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SynergyService {
  constructor(
    @InjectRepository(SynergyEntity)
    private readonly synergyRepository: Repository<SynergyEntity>,
  ) {}

  async createSynergy(createSynergyDto: CreateSynergyDto) {
    const synergy = this.synergyRepository.create(createSynergyDto);
    return await this.synergyRepository.save(synergy);
  }

  async findAllSynergy() {
    const synergies = await this.synergyRepository.find({
      relations: {
        caseReportValidate: true,
      },
      where: {
        syn_status: false,
      },
    });

    if (!synergies || synergies.length === 0) {
      throw new HttpException(
        'No se encontró la lista de casos en sinergia',
        HttpStatus.NOT_FOUND,
      );
    }

    return synergies;
  }

  async findOneSynergy(id: number) {
    const synergy = await this.synergyRepository.findOne({
      where: { id, syn_status: false },
    });
    return synergy;
  }

  async updateSynergy(id: number, updateSynergyDto: UpdateSynergyDto) {
    const synergy = await this.findOneSynergy(id);
    const result = await this.synergyRepository.update(
      synergy.id,
      updateSynergyDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se actualizar el reporte en sinergia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteSynergy(id: number) {
    const synergy = await this.findOneSynergy(id);
    const result = await this.synergyRepository.softDelete(synergy.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el el reporte en sinergia.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
