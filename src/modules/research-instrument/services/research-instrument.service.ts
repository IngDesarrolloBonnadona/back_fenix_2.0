import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResearchInstrumentDto } from '../dto/create-research-instrument.dto';
import { UpdateResearchInstrumentDto } from '../dto/update-research-instrument.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearchInstrument as ResearchInstrumentEntity } from '../entities/research-instrument.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResearchInstrumentService {
  constructor(
    @InjectRepository(ResearchInstrumentEntity)
    private readonly researchInstrumentRepository: Repository<ResearchInstrumentEntity>,
  ) {}

  async createResearchInstrument(
    createResearchInstrumentDto: CreateResearchInstrumentDto,
  ) {
    if (
      !createResearchInstrumentDto ||
      !createResearchInstrumentDto.inst_r_name
    ) {
      return new HttpException(
        'El nombre del instrumento de investigación es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findResearchInstrument =
      await this.researchInstrumentRepository.findOne({
        where: {
          inst_r_name: createResearchInstrumentDto.inst_r_name,
          inst_r_status: true,
        },
      });

    if (findResearchInstrument) {
      return new HttpException(
        'El instrumento de investigación ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const researchInstrument = this.researchInstrumentRepository.create(
      createResearchInstrumentDto,
    );
    await this.researchInstrumentRepository.save(researchInstrument);

    return new HttpException(
      `¡El instrumento de investigación ${researchInstrument.inst_r_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllResearchInstruments() {
    const researchInstruments = await this.researchInstrumentRepository.find({
      where: { inst_r_status: true },
      order: { inst_r_name: 'ASC' },
    });

    if (researchInstruments.length === 0) {
      return new HttpException(
        'No se encontro la lista de instrumentos de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }

    return researchInstruments;
  }

  async findOneResearchInstrument(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del instrumento de investigación es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const researchInstrument = await this.researchInstrumentRepository.findOne({
      where: { id, inst_r_status: true },
    });

    if (!researchInstrument) {
      return new HttpException(
        'No se encontro el instrumento de investigación.',
        HttpStatus.NOT_FOUND,
      );
    }

    return researchInstrument;
  }

  async updateResearchInstrument(
    id: number,
    updateResearchInstrumentDto: UpdateResearchInstrumentDto,
  ) {
    if (!updateResearchInstrumentDto) {
      return new HttpException(
        'Los datos para actualizar el instrumento de investigación son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneResearchInstrument(id);
    const result = await this.researchInstrumentRepository.update(
      id,
      updateResearchInstrumentDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el instrumento de investigación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteResearchInstrument(id: number) {
    const researchInstrumentFound =
      await this.researchInstrumentRepository.findOneBy({ id });

    if (!researchInstrumentFound) {
      return new HttpException(
        `Instrumento no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.researchInstrumentRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el instrumento de investigación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
