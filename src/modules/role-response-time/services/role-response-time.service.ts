import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleResponseTimeDto } from '../dto/create-role-response-time.dto';
import { UpdateRoleResponseTimeDto } from '../dto/update-role-response-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleResponseTime as RoleResponseTimeResponseTimeEntity } from '../entities/role-response-time.entity';
import { Repository } from 'typeorm';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';
import { RoleService } from 'src/modules/role/services/role.service';

@Injectable()
export class RoleResponseTimeService {
  constructor(
    @InjectRepository(RoleResponseTimeResponseTimeEntity)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTimeResponseTimeEntity>,

    private readonly severityClasificationService: SeverityClasificationService,
    private readonly roleService: RoleService,
  ) {}
  async createRoleResponseTime(
    createRoleResponseTimeDto: CreateRoleResponseTimeDto,
  ) {
    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: createRoleResponseTimeDto.rest_r_role_id_fk,
        rest_r_severityclasif_id_fk:
          createRoleResponseTimeDto.rest_r_severityclasif_id_fk,
      },
    });

    if (findRoleResponseTime) {
      throw new HttpException(
        'Ya existe un tiempo de respuesta caso con el rol y la clasificación de severidad especificados.',
        HttpStatus.CONFLICT,
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
      `¡El tiempo de respuesta para el rol ${findRole.role_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRoleResponseTimes() {
    const roleResponseTimes = await this.roleResponseTimeRepository.find({
      where: { rest_r_status: true },
      relations: { role: true, severityClasification: true },
    });

    if (roleResponseTimes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tiempos de respuestas de cada rol',
        HttpStatus.NO_CONTENT,
      );
    }

    return roleResponseTimes;
  }

  async findOnefindAllRoleResponseTime(id: number) {
    const roleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: { id, rest_r_status: true },
      relations: { role: true, severityClasification: true },
    });

    if (!roleResponseTime) {
      throw new HttpException(
        'No se encontró el tiempo de respuestas de este rol',
        HttpStatus.NO_CONTENT,
      );
    }

    return roleResponseTime;
  }

  async updateRoleResponseTime(
    id: number,
    updateRoleResponseTimeDto: UpdateRoleResponseTimeDto,
  ) {
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
    const roleResponseTime = await this.findOnefindAllRoleResponseTime(id);
    const result = await this.roleResponseTimeRepository.softDelete(
      roleResponseTime.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tiempo de respuesta de este rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
