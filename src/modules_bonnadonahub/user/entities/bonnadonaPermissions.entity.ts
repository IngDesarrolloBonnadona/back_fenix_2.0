import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesPermissions } from "./bonnadonaRolesPermissions.entity";
import { Modules } from "./bonnadonaModules.entity";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 32 })
    name!: string;
  
    @ManyToOne(
      _type => Modules,
      module => module.permissions,
    )
    module!: Modules;
  
    @OneToMany(
      _type => RolesPermissions,
      rp => rp.permissions,
    )
    rp?: RolesPermissions[];
  }