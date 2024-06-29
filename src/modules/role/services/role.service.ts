import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role as RoleEntity } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const findRole = await this.roleRepository.findOne({
      where: {
        role_name: createRoleDto.role_name,
        role_status: true,
      },
    });

    if (findRole) {
      throw new HttpException('El rol ya existe.', HttpStatus.CONFLICT);
    }
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAllRoles() {
    const roles = await this.roleRepository.find({
      where: {
        role_status: true,
      },
    });

    if (roles.length === 0) {
      throw new HttpException(
        'No se encontró la lista de roles',
        HttpStatus.NO_CONTENT,
      );
    }
    return roles;
  }

  async findOneRole(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id, role_status: true },
    });

    if (!role) {
      throw new HttpException('No se encontró el rol', HttpStatus.NO_CONTENT);
    }

    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOneRole(id);
    const result = await this.roleRepository.update(role.id, updateRoleDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteRole(id: number) {
    const role = await this.findOneRole(id);
    const result = await this.roleRepository.softDelete(role.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
