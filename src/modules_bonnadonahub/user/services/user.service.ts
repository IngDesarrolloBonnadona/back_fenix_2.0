import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/bonnadonaUsers.entity';
import { Repository } from 'typeorm';
import { IUserPermission } from '../interfaces/IUserPermissions.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users, 'bonnadonaHub')
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUserPermissions(userId: string) {
    const permissions: IUserPermission[] = await this.userRepository
      .createQueryBuilder('u')
      .select(['p.name AS name', 'm.name as module'])
      .where('u.id = :userId', { userId })
      .andWhere('m.name = :module', { module: 'Fenix' })
      .andWhere('u.active = true')
      .andWhere('u.deletedAt IS NULL')
      .leftJoin('u.details', 'd')
      .leftJoin('d.position', 'pos')
      .leftJoin('pos.role', 'role')
      .leftJoin('role.rp', 'rp')
      .leftJoin('rp.permissions', 'p')
      .leftJoin('p.module', 'm')
      .getRawMany();

    if (permissions.length === 0) {
      throw new HttpException(
        'No se encontró la lista de permisos del usuario.',
        HttpStatus.NOT_FOUND,
      );
    }

    return permissions.map((permission) => ({
      nombre: `${permission.module}-${permission.name}`,
      authorized: true,
    }));
  }
}
