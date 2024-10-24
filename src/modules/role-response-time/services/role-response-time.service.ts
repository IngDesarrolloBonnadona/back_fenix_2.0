import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateRoleResponseTimeDto } from '../dto/create-role-response-time.dto';
import { UpdateRoleResponseTimeDto } from '../dto/update-role-response-time.dto';

import { RoleResponseTime } from '../entities/role-response-time.entity';

import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';
import { RolePermissionService } from 'src/modules/role-permission/services/role-permission.service';

@Injectable()
export class RoleResponseTimeService {
  constructor(
    @InjectRepository(RoleResponseTime)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTime>,

    private readonly severityClasificationService: SeverityClasificationService,
    private readonly roleService: RolePermissionService,
  ) {}
  async createRoleResponseTime(
    createRoleResponseTimeDto: CreateRoleResponseTimeDto,
  ) {
    if (
      !createRoleResponseTimeDto ||
      !createRoleResponseTimeDto.rest_r_role_id_fk ||
      !createRoleResponseTimeDto.rest_r_responsetime ||
      !createRoleResponseTimeDto.rest_r_severityclasif_id_fk
    ) {
      throw new HttpException(
        'Algunos datos del tiempo de respuesta de los roles son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: createRoleResponseTimeDto.rest_r_role_id_fk,
        rest_r_severityclasif_id_fk:
          createRoleResponseTimeDto.rest_r_severityclasif_id_fk,
      },
    });

    if (findRoleResponseTime) {
      throw new HttpException(
        'Ya existe un tiempo de respuesta del rol y la clasificación de severidad especificado.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.severityClasificationService.findOneSeverityClasification(
      createRoleResponseTimeDto.rest_r_severityclasif_id_fk,
    );

    const findRole = await this.roleService.findOneRole(
      createRoleResponseTimeDto.rest_r_role_id_fk,
    );

    const roleResponseTime = this.roleResponseTimeRepository.create(
      createRoleResponseTimeDto,
    );

    await this.roleResponseTimeRepository.save(roleResponseTime);

    return new HttpException(
      `¡El tiempo de respuesta se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRoleResponseTimes() {
    const roleResponseTimes = await this.roleResponseTimeRepository.find({
      where: { rest_r_status: true },
      relations: { role: true, severityClasification: true },
      order: {
        createdAt: 'DESC',
      },
    });

    if (roleResponseTimes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tiempos de respuesta de cada rol',
        HttpStatus.NOT_FOUND,
      );
    }

    return roleResponseTimes;
  }

  async findOnefindAllRoleResponseTime(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del tiempo de respuesta del rol es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const roleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: { id, rest_r_status: true },
      relations: { role: true, severityClasification: true },
    });

    if (!roleResponseTime) {
      throw new HttpException(
        'No se encontró el tiempo de respuesta de este rol',
        HttpStatus.NOT_FOUND,
      );
    }

    return roleResponseTime;
  }

  async updateRoleResponseTime(
    id: number,
    updateRoleResponseTimeDto: UpdateRoleResponseTimeDto,
  ) {
    if (!updateRoleResponseTimeDto) {
      throw new HttpException(
        'Los datos para actualizar el tiempo de respuesta del rol son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const roleResponseTime = await this.findOnefindAllRoleResponseTime(id);
    const result = await this.roleResponseTimeRepository.update(
      roleResponseTime.id,
      updateRoleResponseTimeDto,
    );
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tiempo de respuesta de este rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRoleResponseTime(id: number) {
    const roleResponseTimeFound =
      await this.roleResponseTimeRepository.findOneBy({ id });

    if (!roleResponseTimeFound) {
      return new HttpException(
        `Tiempo de respuesta del rol no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.roleResponseTimeRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tiempo de respuesta de este rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
