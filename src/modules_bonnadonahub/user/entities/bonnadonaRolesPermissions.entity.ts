import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./bonnadonaRoles.entity";
import { Permissions } from "./bonnadonaPermissions.entity";

@Entity({ name: 'roles-permissions' })
export class RolesPermissions {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    _type => Roles,
    role => role.rp,
  )
  role!: Roles;

  @ManyToOne(
    _type => Permissions,
    permission => permission.rp,
  )
  permissions!: Permissions;
}
