import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSafetyBarrierDto } from '../dto/create-safety-barrier.dto';
import { UpdateSafetyBarrierDto } from '../dto/update-safety-barrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SafetyBarrier as SafetyBarrierEntity } from '../entities/safety-barrier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SafetyBarriersService {
  constructor(
    @InjectRepository(SafetyBarrierEntity)
    private readonly safetyBarrierRepository: Repository<SafetyBarrierEntity>,
  ) {}

  async createSafetyBarrier(createSafetyBarrierDto: CreateSafetyBarrierDto) {
    if (!createSafetyBarrierDto || !createSafetyBarrierDto.saf_b_name) {
      return new HttpException(
        'El nombre de la barrera de seguridad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findSafetyBarrier = await this.safetyBarrierRepository.findOne({
      where: {
        saf_b_name: createSafetyBarrierDto.saf_b_name,
        saf_b_status: true,
      },
    });

    if (findSafetyBarrier) {
      return new HttpException(
        'La barrera de seguridad ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const safetyBarrier = this.safetyBarrierRepository.create(
      createSafetyBarrierDto,
    );
    await this.safetyBarrierRepository.save(safetyBarrier);

    return new HttpException(
      `¡La barrera de seguridad ${safetyBarrier.saf_b_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSafetyBarriers() {
    const safetyBarriers = await this.safetyBarrierRepository.find({
      where: { saf_b_status: true },
    });

    if (safetyBarriers.length === 0) {
      return new HttpException(
        'No se encontró la lista de barreras de seguridad.',
        HttpStatus.NOT_FOUND,
      );
    }
    return safetyBarriers;
  }

  async findOneSafetyBarrier(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de la barrera de seguridad es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const safetyBarrier = await this.safetyBarrierRepository.findOne({
      where: { id, saf_b_status: true },
    });

    if (!safetyBarrier) {
      return new HttpException(
        'No se encontró la barrera de seguridad.',
        HttpStatus.NOT_FOUND,
      );
    }
    return safetyBarrier;
  }

  async updateSafetyBarrier(
    id: number,
    updateSafetyBarrierDto: UpdateSafetyBarrierDto,
  ) {
    if (!updateSafetyBarrierDto) {
      return new HttpException(
        'Los datos para actualizar la barrera de seguridad son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.findOneSafetyBarrier(id);
    const result = await this.safetyBarrierRepository.update(
      id,
      updateSafetyBarrierDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la barrera de seguridad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteSafetyBarrier(id: number) {
    const safetyBarrierFound = await this.safetyBarrierRepository.findOneBy({
      id,
    });

    if (!safetyBarrierFound) {
      return new HttpException(
        `Barrera de seguridad no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.safetyBarrierRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la barrera de seguridad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
