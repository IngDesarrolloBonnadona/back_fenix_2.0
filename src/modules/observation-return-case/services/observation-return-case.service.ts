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

  async findAllObservationReturnCase(): Promise<ObservationReturnCaseEntity[]> {
    const observationReturns = await this.observationReturnRepository.find({
      where: {
        rec_o_status: true,
      },
    });

    if (observationReturns.length === 0) {
      throw new HttpException(
        `No se encontró la lista de observaciones de devolución del caso`,
        HttpStatus.NO_CONTENT,
      );
    }
    return observationReturns;
  }

  async findOneObservationReturnCase(id: number) {
    const observationReturn = await this.observationReturnRepository.findOne({
      where: {
        id,
        rec_o_status: true,
      },
    });

    if (!observationReturn) {
      throw new HttpException(
        'No se encontró la observación de devolución del caso',
        HttpStatus.NO_CONTENT,
      );
    }
    return observationReturn;
  }

  async updateObservationReturnCase(
    id: number,
    updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    const observationReturn = await this.findOneObservationReturnCase(id);
    const result = await this.observationReturnRepository.update(
      observationReturn.id,
      updateObservationReturnCaseDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la observación de devolución del caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteObservationReturnCase(id: number) {
    const observationReturn = await this.findOneObservationReturnCase(id);
    const result = await this.observationReturnRepository.softDelete(
      observationReturn.id,
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
