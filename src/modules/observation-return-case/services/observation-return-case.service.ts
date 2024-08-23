import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservationReturnCase as ObservationReturnCaseEntity } from '../entities/observation-return-case.entity';
import { Repository } from 'typeorm';
import { ReasonReturnCaseService } from 'src/modules/reason-return-case/services/reason-return-case.service';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';

@Injectable()
export class ObservationReturnCaseService {
  constructor(
    @InjectRepository(ObservationReturnCaseEntity)
    private readonly observationReturnRepository: Repository<ObservationReturnCaseEntity>,

    private readonly reasonReturnCaseService: ReasonReturnCaseService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async createObservationReturnCase(
    createObservationReturnCaseDto: CreateObservationReturnCaseDto,
    idUser: number,
    idCaseValidate: string,
  ) {
    if (
      !createObservationReturnCaseDto ||
      !createObservationReturnCaseDto.rec_o_observation ||
      !createObservationReturnCaseDto.rec_o_reasonreturn_id_fk
    ) {
      throw new HttpException(
        'Algunos datos de la observación de devolución del caso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idUser) {
      throw new HttpException(
        'El identificador del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idCaseValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReportCaseValidate =
      await this.caseReportValidateService.findOneReportValidate(
        idCaseValidate,
      );

    await this.reasonReturnCaseService.findOneReasonReturnCase(
      createObservationReturnCaseDto.rec_o_reasonreturn_id_fk,
    );

    const observationReturns = this.observationReturnRepository.create({
      ...createObservationReturnCaseDto,
      rec_o_user_id: idUser,
      rec_o_validatedcase_id_fk: idCaseValidate,
    });
    await this.observationReturnRepository.save(observationReturns);

    return new HttpException(
      `¡La observación del caso #${findReportCaseValidate.val_cr_filingnumber} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllObservationReturnCase() {
    const observationReturns = await this.observationReturnRepository.find({
      where: {
        rec_o_status: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (observationReturns.length === 0) {
      throw new HttpException(
        `No se encontró la lista de observaciones de devolución del caso`,
        HttpStatus.NOT_FOUND,
      );
    }
    return observationReturns;
  }

  async findOneObservationReturnCase(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador de la observación de devolución del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const observationReturn = await this.observationReturnRepository.findOne({
      where: {
        id,
        rec_o_status: true,
      },
    });

    if (!observationReturn) {
      throw new HttpException(
        'No se encontró la observación de devolución del caso.',
        HttpStatus.NOT_FOUND,
      );
    }
    return observationReturn;
  }

  async updateObservationReturnCase(
    id: number,
    updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    if (!updateObservationReturnCaseDto) {
      throw new HttpException(
        'Los datos para actualizar la observación de devolución del caso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const observationReturn = await this.findOneObservationReturnCase(id);
    const result = await this.observationReturnRepository.update(
      observationReturn.id,
      updateObservationReturnCaseDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la observación de devolución del caso.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteObservationReturnCase(id: number) {
    const observationReturnFound =
      await this.observationReturnRepository.findOneBy({ id });

      if (!observationReturnFound) {
        return new HttpException(
          `Observación no encontrado, favor recargar.`,
          HttpStatus.NOT_FOUND
        )
      }

    const result = await this.observationReturnRepository.softDelete(
      id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la observación de devolución del caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
