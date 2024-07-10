import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./bonnadonaUsers.entity";
import { EOportunitySourceStatus } from "../enums/improvement.enum";

export class OportunitySource {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    identificationDate!: Date;
  
    @Column('text')
    description!: string;
  
    @Column({
      default: EOportunitySourceStatus.Pendiente,
    })
    status!: number;
  
    @Column({
      nullable: true,
    })
    reason?: string;
  
    // @ManyToOne((_type) => Users, (user) => user.oportunitySources)
    // attendant?: Users;
  
    // @ManyToOne((_type) => OriginOportunity, (origin) => origin.oportunitySource)
    // origin!: OriginOportunity;
  
    // @ManyToOne((_type) => SourceOportunity, (source) => source.oportunitySources)
    // source?: SourceOportunity;
  }