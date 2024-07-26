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
    const findSafetyBarrier = await this.safetyBarrierRepository.findOne({
      where: {
        saf_b_name: createSafetyBarrierDto.saf_b_name,
        saf_b_status: true,
      },
    });

    if (findSafetyBarrier) {
      throw new HttpException(
        'La barrera de seguridad ya existe.',
        HttpStatus.CONFLICT,
      );
    }
    const safetyBarrier = this.safetyBarrierRepository.create(
      createSafetyBarrierDto,
    );
    await this.safetyBarrierRepository.save(safetyBarrier);

    return new HttpException(
      `¡El origen ${safetyBarrier.saf_b_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllSafetyBarriers() {
    const safetyBarriers = await this.safetyBarrierRepository.find({
      where: { saf_b_status: true },
    });

    if (safetyBarriers.length === 0) {
      throw new HttpException(
        'No se encontró la lista de barreras de seguridad.',
        HttpStatus.NO_CONTENT,
      );
    }
    return safetyBarriers;
  }

  async findOneSafetyBarrier(id: number) {
    const safetyBarrier = await this.safetyBarrierRepository.findOne({
      where: { id, saf_b_status: true },
    });

    if (!safetyBarrier) {
      throw new HttpException(
        'No se encontró la barrera de seguridad.',
        HttpStatus.NO_CONTENT,
      );
    }
    return safetyBarrier;
  }

  async updateSafetyBarrier(
    id: number,
    updateSafetyBarrierDto: UpdateSafetyBarrierDto,
  ) {
    const safetyBarrier = await this.findOneSafetyBarrier(id);
    const result = await this.safetyBarrierRepository.update(
      safetyBarrier.id,
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
    const safetyBarrier = await this.findOneSafetyBarrier(id);
    const result = await this.safetyBarrierRepository.softDelete(
      safetyBarrier.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la barrera de seguridad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
