import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReasonReturnCase as ReasonReturnCaseEntity } from '../entities/reason-return-case.entity';
import { Repository } from 'typeorm';
import { RolePermissionService } from 'src/modules/role-permission/services/role-permission.service';

@Injectable()
export class ReasonReturnCaseService {
  constructor(
    @InjectRepository(ReasonReturnCaseEntity)
    private readonly reasonReturnCaseRepository: Repository<ReasonReturnCaseEntity>,

    private readonly roleService: RolePermissionService,
  ) {}

  async createReasonReturnCase(
    createReasonReturnCaseDto: CreateReasonReturnCaseDto,
  ) {
    if (
      !createReasonReturnCaseDto ||
      !createReasonReturnCaseDto.rec_r_cause ||
      !createReasonReturnCaseDto.rec_r_role_id_fk
    ) {
      return new HttpException(
        'Algunos datos del motivo de devolución son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReasonReturnCase = await this.reasonReturnCaseRepository.findOne({
      where: {
        rec_r_role_id_fk: createReasonReturnCaseDto.rec_r_role_id_fk,
        rec_r_cause: createReasonReturnCaseDto.rec_r_cause,
        rec_r_status: true,
      },
    });

    if (findReasonReturnCase) {
      return new HttpException(
        `El motivo de devolución para este rol ya existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.roleService.findOneRole(
      createReasonReturnCaseDto.rec_r_role_id_fk,
    );

    const reasonReturnCase = this.reasonReturnCaseRepository.create(
      createReasonReturnCaseDto,
    );
    await this.reasonReturnCaseRepository.save(reasonReturnCase);

    return new HttpException(
      `¡El motivo de devolución ${reasonReturnCase.rec_r_cause} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllReasonReturnCases() {
    const reasonReturnCases = await this.reasonReturnCaseRepository.find({
      where: { rec_r_status: true },
      relations: { role: true },
      order: {
        rec_r_cause: 'ASC',
      },
    });

    if (reasonReturnCases.length === 0) {
      return new HttpException(
        'No se encontró la lista de motivos de devolución.',
        HttpStatus.NOT_FOUND,
      );
    }
    return reasonReturnCases;
  }

  async findOneReasonReturnCase(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del motivo de devolución es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reasonReturnCase = await this.reasonReturnCaseRepository.findOne({
      where: { id, rec_r_status: true },
      relations: { role: true },
    });

    if (!reasonReturnCase) {
      return new HttpException(
        'No se encontró el motivo de devolución.',
        HttpStatus.NOT_FOUND,
      );
    }
    return reasonReturnCase;
  }

  async updateReasonReturnCase(
    id: number,
    updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    if (!updateReasonReturnCaseDto) {
      return new HttpException(
        'Los datos para actualizar el motivo de devolución son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneReasonReturnCase(id);
    const result = await this.reasonReturnCaseRepository.update(
      id,
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
      HttpStatus.OK,
    );
  }

  async deleteReasonReturnCase(id: number) {
    const reasonFound = await this.reasonReturnCaseRepository.findOneBy({ id });

    if (!reasonFound) {
      return new HttpException(
        `Razón devolución de caso no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.reasonReturnCaseRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el motivo de devolución.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
