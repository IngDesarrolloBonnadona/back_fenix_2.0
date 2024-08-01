import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissions } from 'src/utils/enums/permissions.enum';
import { UserService } from 'src/modules_bonnadonahub/user/services/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    console.log('Permisos requeridos: ', requiredPermissions);
    if (!requiredPermissions) {
      return true;
    }

    // Obtener userId desde los parámetros de la solicitud
    const userIdPermission = context.switchToHttp().getRequest()
      .params.userIdPermission;
    console.log('id del usuario: ', userIdPermission);

    // Obtener los permisos actuales del usuario
    const permissions =
      await this.userService.getUserPermissions(userIdPermission);
    const hasPermission = permissions.some((permission) =>
      requiredPermissions.includes(permission.nombre),
    );

    // Valida si el usuario tiene al menos uno de los permisos requeridos
    if (!hasPermission) {
      throw new HttpException(
        'No tienes permisos para realizar esta acción',
        HttpStatus.FORBIDDEN,
      );
    }

    return hasPermission;
  }
}
