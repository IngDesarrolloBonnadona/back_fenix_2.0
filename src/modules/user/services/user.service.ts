import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserPermissionDto: CreateUserDto) {
    return 'This action adds a new userPermission';
  }

  findAll() {
    return `This action returns all userPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPermission`;
  }

  update(id: number, updateUserPermissionDto: UpdateUserDto) {
    return `This action updates a #${id} userPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPermission`;
  }
}
