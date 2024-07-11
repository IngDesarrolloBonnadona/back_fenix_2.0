import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";
import { UserDetails } from "./bonnadonaDetails.entity";
import { Roles } from "./bonnadonaRoles.entity";

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 64, unique: true })
  name!: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;

  @OneToMany(
    _type => UserDetails,
    details => details.position,
  )
  details?: UserDetails[];

  @ManyToOne(
    _type => Roles,
    role => role.positions,
    { nullable: true },
  )
  role?: Roles;
}
