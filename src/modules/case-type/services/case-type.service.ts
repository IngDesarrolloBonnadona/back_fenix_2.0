import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCaseTypeDto } from '../dto/create-case-type.dto';
import { UpdateCaseTypeDto } from '../dto/update-case-type.dto';
import { Repository } from 'typeorm';
import { CaseType as CaseTypeEntity } from '../entities/case-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaseTypeService {
  constructor(
    @InjectRepository(CaseTypeEntity)
    private readonly caseTypeRepository: Repository<CaseTypeEntity>,
  ) {}

  async createCaseType(createCaseTypeDto: CreateCaseTypeDto) {
    const findCaseType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: createCaseTypeDto.cas_t_name,
        cas_t_status: true,
      },
    });

    if (findCaseType) {
      throw new HttpException(
        'El tipo de caso ya existe.',
        HttpStatus.CONFLICT,
      );
    }
    const caseType = this.caseTypeRepository.create(createCaseTypeDto);
    await this.caseTypeRepository.save(caseType);

    return new HttpException(
      `¡el tipo de caso ${caseType.cas_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllCaseTypes() {
    const caseTypes = await this.caseTypeRepository.find({
      where: { cas_t_status: true },
      order: {
        cas_t_name: 'ASC',
      },
      // relations: {
      //   eventType: true,
      //   caseReportValidate: true,
      // },
    });

    if (caseTypes.length === 0) {
      throw new HttpException(
        'No se encontró la lista de tipos de caso',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseTypes;
  }

  async findOneCaseType(id: number) {
    const caseType = await this.caseTypeRepository.findOne({
      where: { id, cas_t_status: true },
      relations: {
        eventType: true
      //   caseReportValidate: true,
      },
    });

    if (!caseType) {
      throw new HttpException(
        'No se encontró el tipo de caso',
        HttpStatus.NO_CONTENT,
      );
    }

    return caseType;
  }

  async updateCaseType(id: number, updateCaseTypeDto: UpdateCaseTypeDto) {
    const caseType = await this.findOneCaseType(id);
    const result = await this.caseTypeRepository.update(
      caseType.id,
      updateCaseTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteCaseType(id: number) {
    const caseType = await this.findOneCaseType(id);
    const result = await this.caseTypeRepository.softDelete(caseType.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de caso`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
