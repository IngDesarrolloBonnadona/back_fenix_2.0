import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProtocolDto } from '../dto/create-protocol.dto';
import { UpdateProtocolDto } from '../dto/update-protocol.dto';

import { Protocol } from '../entities/protocol.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(Protocol)
    private readonly protocolRepository: Repository<Protocol>,
  ) {}

  async createProtocol(createProtocolDto: CreateProtocolDto) {
    if (!createProtocolDto || !createProtocolDto.prot_name) {
      return new HttpException(
        'El nombre del protocolo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findProtocol = await this.protocolRepository.findOne({
      where: { prot_name: createProtocolDto.prot_name, prot_status: true },
    });

    if (findProtocol) {
      return new HttpException(
        'El protocolo ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const protocol = this.protocolRepository.create(createProtocolDto);
    await this.protocolRepository.save(protocol);

    return new HttpException(
      `¡El protocolo ${protocol.prot_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllProtocols() {
    const protocols = await this.protocolRepository.find({
      where: { prot_status: true },
      order: { prot_name: 'ASC' },
    });

    if (protocols.length === 0) {
      return new HttpException(
        'No se encontró la lista de protocolos.',
        HttpStatus.NOT_FOUND,
      );
    }
    return protocols;
  }

  async findOneProtocol(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del protocolo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const protocol = await this.protocolRepository.findOne({
      where: { id, prot_status: true },
    });

    if (!protocol) {
      return new HttpException(
        'No se encontró el protocolo',
        HttpStatus.NOT_FOUND,
      );
    }
    return protocol;
  }

  async updateProtocol(id: number, updateProtocolDto: UpdateProtocolDto) {
    if (!updateProtocolDto) {
      return new HttpException(
        'Los datos para actualizar el protocolo son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneProtocol(id);
    const result = await this.protocolRepository.update(id, updateProtocolDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el protocolo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteProtocol(id: number) {
    const protocolFound = await this.protocolRepository.findOneBy({ id });

    if (!protocolFound) {
      return new HttpException(
        `Protocolo no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND
      )
    }

    const result = await this.protocolRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el protocolo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
