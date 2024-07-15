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
    const findReasonReturnCase = await this.reasonReturnCaseRepository.findOne({
      where: {
        rec_r_role_id_fk: createReasonReturnCaseDto.rec_r_role_id_fk,
        rec_r_cause: createReasonReturnCaseDto.rec_r_cause,
        rec_r_status: true,
      },
    });

    if (findReasonReturnCase) {
      throw new HttpException(
        `El motivo de devolución para este rol ya existe.`,
        HttpStatus.CONFLICT,
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
      relations: { role: true },
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
      HttpStatus.OK,
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

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
