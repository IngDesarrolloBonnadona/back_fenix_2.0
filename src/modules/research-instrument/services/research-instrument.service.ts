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
    const findResearchInstrument =
      await this.researchInstrumentRepository.findOne({
        where: {
          inst_r_name: createResearchInstrumentDto.inst_r_name,
          inst_r_status: true,
        },
      });

    if (findResearchInstrument) {
      throw new HttpException(
        'El instrumento de investigación ya existe.',
        HttpStatus.CONFLICT,
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
      throw new HttpException(
        'No se encontro la lista de instrumentos de investigación.',
        HttpStatus.NO_CONTENT,
      );
    }

    return researchInstruments;
  }

  async findOneResearchInstrument(id: number) {
    const researchInstrument = await this.researchInstrumentRepository.findOne({
      where: { id, inst_r_status: true },
    });

    if (!researchInstrument) {
      throw new HttpException(
        'No se encontro el instrumento de investigación.',
        HttpStatus.NO_CONTENT,
      );
    }

    return researchInstrument;
  }

  async updateResearchInstrument(
    id: number,
    updateResearchInstrumentDto: UpdateResearchInstrumentDto,
  ) {
    const researchInstrument = await this.findOneResearchInstrument(id);
    const result = await this.researchInstrumentRepository.update(
      researchInstrument.id,
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
    const researchInstrument = await this.findOneResearchInstrument(id);
    const result = await this.researchInstrumentRepository.softDelete(
      researchInstrument.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el instrumento de investigación.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
