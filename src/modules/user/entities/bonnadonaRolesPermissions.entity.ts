import { PrimaryGeneratedColumn } from "typeorm";

export class RolesPermissions {
  @PrimaryGeneratedColumn()
  id!: number;
}
