import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position as PositionEntity } from '../entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>
  ){}

  async create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto)
    return await this.positionRepository.save(position);
  }

  async findAllPosition() {
    const positions = await this.positionRepository.find();

    if (!positions) {
      throw new HttpException(
        'No se encontró la lista de cargos',
        HttpStatus.NOT_FOUND,
      )
    }

    return positions;
  }

  async findOnePosition(id: number) {
    const position = await this.positionRepository.findOne({ where: { id }});

    if (!position){
      throw new HttpException(
        'No se encontró el cargo',
        HttpStatus.NOT_FOUND
      )
    }
    return position;
  }

  async updatePosition(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.findOnePosition(id)
    const result = await this.positionRepository.update(position.id, updatePositionDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED
    );  
  }

  async deletePosition(id: number) {
    const position = await this.findOnePosition(id);
    const result = await this.positionRepository.softDelete(position.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED
    ); 
  }
}
