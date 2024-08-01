import { SetMetadata } from '@nestjs/common';
import { permissions } from 'src/utils/enums/permissions.enum';

export const Permission = (...permissions: permissions[]) =>
  SetMetadata('permissions', permissions);
