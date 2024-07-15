import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission as RolePermissionEntity } from '../entities/role-permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly roleRepository: Repository<RolePermissionEntity>,
  ) {}

  async createRole(createRoleDto: CreateRolePermissionDto) {
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
    await this.roleRepository.save(role);

    return new HttpException(
      `¡El rol ${role.role_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRoles() {
    const roles = await this.roleRepository.find({
      where: {
        role_status: true,
      },
      order: {
        role_name: 'ASC',
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

  async findRoleByName(createRoleDto: CreateRolePermissionDto) {
    const roleName = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name, role_status: true },
    });

    if (!roleName) {
      throw new HttpException(
        'No se encontró el nombre del rol',
        HttpStatus.NO_CONTENT,
      );
    }

    return roleName;
  }

  async updateRole(id: number, updateRoleDto: UpdateRolePermissionDto) {
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
      HttpStatus.OK,
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

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
