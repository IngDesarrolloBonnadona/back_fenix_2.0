import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit as UnitEntity } from '../entities/unit.entity';
import { Repository } from 'typeorm';
import { ServiceService } from 'src/modules/service/services/service.service';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    private readonly serviceService: ServiceService,
  ) {}

  async createUnit(createUnitDto: CreateUnitDto) {
    const FindUnit = await this.unitRepository.findOne({
      where: {
        unit_name: createUnitDto.unit_name,
        unit_service_id_fk: createUnitDto.unit_service_id_fk,
        unit_status: true,
      },
    });

    await this.serviceService.findOneService(createUnitDto.unit_service_id_fk);

    if (FindUnit) {
      throw new HttpException(
        'La unidad ya existe con el servicio seleccionado.',
        HttpStatus.CONFLICT,
      );
    }

    const unit = this.unitRepository.create(createUnitDto);
    await this.unitRepository.save(unit);

    return new HttpException(
      `¡La unidad ${unit.unit_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllUnits() {
    const units = await this.unitRepository.find({
      where: {
        unit_status: true,
      },
      // relations: {
      //   service: true,
      //   caseReportValidate: true,
      // },
    });

    if (units.length === 0) {
      throw new HttpException(
        'No se encontró la lista de unidades.',
        HttpStatus.NO_CONTENT,
      );
    }

    return units;
  }

  async findOneUnit(id: number) {
    const unit = await this.unitRepository.findOne({
      where: { id, unit_status: true },
      // relations: {
      //   service: true,
      //   caseReportValidate: true,
      // },
    });

    if (!unit) {
      throw new HttpException(
        'No se encontró la unidad.',
        HttpStatus.NO_CONTENT,
      );
    }

    return unit;
  }

  async findUnitByService(serviceId: number) {
    const unitByService = await this.unitRepository.find({
      where: {
        unit_service_id_fk: serviceId,
        unit_status: true,
      },
    });

    if (!unitByService) {
      throw new HttpException(
        'No se encontró la unidad relacionado al servicio.',
        HttpStatus.CONFLICT,
      );
    }

    return unitByService;
  }

  async updateUnit(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOneUnit(id);

    await this.serviceService.findOneService(updateUnitDto.unit_service_id_fk);

    const result = await this.unitRepository.update(unit.id, updateUnitDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la unidad`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteUnit(id: number) {
    const unit = await this.findOneUnit(id);
    const result = await this.unitRepository.softDelete(unit.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la unidad.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
