import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCaseResponseTimeDto } from '../dto/create-case-response-time.dto';
import { UpdateCaseResponseTimeDto } from '../dto/update-case-response-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseResponseTime as CaseResponseTimeEntity } from '../entities/case-response-time.entity';
import { Repository } from 'typeorm';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';

@Injectable()
export class CaseResponseTimeService {
  constructor(
    @InjectRepository(CaseResponseTimeEntity)
    private readonly caseResponseTimeRepository: Repository<CaseResponseTimeEntity>,

    private readonly severityClasificationService: SeverityClasificationService,
  ) {}
  async createCaseResponseTime(
    createCaseResponseTimeDto: CreateCaseResponseTimeDto,
  ): Promise<CaseResponseTimeEntity> {
    const findCaseResponseTime = await this.caseResponseTimeRepository.findOne({
      where: {
        rest_c_role: createCaseResponseTimeDto.rest_c_role,
        rest_c_responsetime: createCaseResponseTimeDto.rest_c_responsetime,
        rest_c_severityclasif_id_fk:
          createCaseResponseTimeDto.rest_c_severityclasif_id_fk,
      },
    });

    if (findCaseResponseTime) {
      throw new HttpException(
        'Ya existe un tiempo de respuesta de caso con el rol, el tiempo de respuesta y la clasificación de severidad especificados.',
        HttpStatus.CONFLICT,
      );
    }

    await this.severityClasificationService.findOneSeverityClasification(
      createCaseResponseTimeDto.rest_c_severityclasif_id_fk,
    );

    const caseResponseTime = this.caseResponseTimeRepository.create(
      createCaseResponseTimeDto,
    );
    return await this.caseResponseTimeRepository.save(caseResponseTime);
  }

  async findAllCaseResponseTimes(): Promise<CaseResponseTimeEntity[]> {
    const caseResponseTimes = await this.caseResponseTimeRepository.find({
      where: { rest_c_status: true },
    });

    if (caseResponseTimes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tiempos de respuestas de cada rol',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseResponseTimes;
  }

  async findOnefindAllCaseResponseTime(
    id: number,
  ): Promise<CaseResponseTimeEntity> {
    const caseResponseTime = await this.caseResponseTimeRepository.findOne({
      where: { id, rest_c_status: true },
    });

    if (!caseResponseTime) {
      throw new HttpException(
        'No se encontró el tiempo de respuestas de este rol',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseResponseTime;
  }

  async updateCaseResponseTime(
    id: number,
    updateCaseResponseTimeDto: UpdateCaseResponseTimeDto,
  ) {
    const caseResponseTime = await this.findOnefindAllCaseResponseTime(id);
    const result = await this.caseResponseTimeRepository.update(
      caseResponseTime.id,
      updateCaseResponseTimeDto,
    );
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tiempo de respuesta de este rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteCaseResponseTime(id: number) {
    const caseResponseTime = await this.findOnefindAllCaseResponseTime(id);
    const result = await this.caseResponseTimeRepository.softDelete(
      caseResponseTime.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tiempo de respuesta de este rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
