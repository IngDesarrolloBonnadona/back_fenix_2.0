import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProtocolDto } from '../dto/create-protocol.dto';
import { UpdateProtocolDto } from '../dto/update-protocol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Protocol as ProtocolEntity } from '../entities/protocol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolEntity)
    private readonly protocolRepository: Repository<ProtocolEntity>,
  ) {}

  async createProtocol(createProtocolDto: CreateProtocolDto) {
    const findProtocol = await this.protocolRepository.findOne({
      where: { prot_name: createProtocolDto.prot_name, prot_status: true },
    });

    if (findProtocol) {
      throw new HttpException('El protocolo ya existe.', HttpStatus.CONFLICT);
    }

    const protocol = this.protocolRepository.create(createProtocolDto);
    await this.protocolRepository.save(protocol);

    return new HttpException(
      `¡El origen ${protocol.prot_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllProtocols() {
    const protocols = await this.protocolRepository.find({
      where: { prot_status: true },
      order: { prot_name: 'ASC' },
    });

    if (protocols.length === 0) {
      throw new HttpException(
        'No se encontró la lista de protocolos.',
        HttpStatus.NO_CONTENT,
      );
    }
    return protocols;
  }

  async findOneProtocol(id: number) {
    const protocol = await this.protocolRepository.findOne({
      where: { id, prot_status: true },
    });

    if (!protocol) {
      throw new HttpException(
        'No se encontró el protocolo',
        HttpStatus.NO_CONTENT,
      );
    }
    return protocol;
  }

  async updateProtocol(id: number, updateProtocolDto: UpdateProtocolDto) {
    const protocol = await this.findOneProtocol(id);
    const result = await this.protocolRepository.update(
      protocol.id,
      updateProtocolDto,
    );

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
    const protocol = await this.findOneProtocol(id);
    const result = await this.protocolRepository.softDelete(protocol.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el protocolo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
