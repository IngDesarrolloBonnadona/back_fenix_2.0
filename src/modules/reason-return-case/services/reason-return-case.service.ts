import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReasonReturnCase as ReasonReturnCaseEntity } from '../entities/reason-return-case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReasonReturnCaseService {
  constructor(
    @InjectRepository(ReasonReturnCaseEntity)
    private readonly reasonReturnCaseRepository: Repository<ReasonReturnCaseEntity>,
  ) {}

  async createReasonReturnCase(
    createReasonReturnCaseDto: CreateReasonReturnCaseDto,
  ) {
    const findReasonReturnCase = await this.reasonReturnCaseRepository.findOne({
      where: {
        rec_r_actor: createReasonReturnCaseDto.rec_r_actor,
        rec_r_cause: createReasonReturnCaseDto.rec_r_cause,
        rec_r_status: true,
      },
    });

    if (findReasonReturnCase) {
      throw new HttpException(
        `El motivo de devolución para ${createReasonReturnCaseDto.rec_r_actor} ya existe.`,
        HttpStatus.CONFLICT,
      );
    }

    const reasonReturnCase = this.reasonReturnCaseRepository.create(
      createReasonReturnCaseDto,
    );
    return await this.reasonReturnCaseRepository.save(reasonReturnCase);
  }

  async findAlReasonReturnCases() {
    const reasonReturnCases = await this.reasonReturnCaseRepository.find({
      where: { rec_r_status: true },
    });

    if (reasonReturnCases.length === 0) {
      throw new HttpException(
        'No se encontró la lista de motivos de devolución.',
        HttpStatus.NO_CONTENT,
      );
    }
    return reasonReturnCases;
  }

  async findOneReasonReturnCase(id: number) {
    const reasonReturnCase = await this.reasonReturnCaseRepository.findOne({
      where: { id, rec_r_status: true },
    });

    if (!reasonReturnCase) {
      throw new HttpException(
        'No se encontró el motivo de devolución.',
        HttpStatus.NO_CONTENT,
      );
    }
    return reasonReturnCase;
  }

  async updateReasonReturnCase(
    id: number,
    updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    const reasonReturnCase = await this.findOneReasonReturnCase(id);
    const result = await this.reasonReturnCaseRepository.update(
      reasonReturnCase.id,
      updateReasonReturnCaseDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el motivo de devolución.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteReasonReturnCase(id: number) {
    const reasonReturnCase = await this.findOneReasonReturnCase(id);
    const result = await this.reasonReturnCaseRepository.softDelete(
      reasonReturnCase.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el motivo de devolución.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
