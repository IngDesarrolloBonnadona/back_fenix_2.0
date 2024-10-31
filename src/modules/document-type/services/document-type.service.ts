import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';

import { DocumentType } from '../entities/document-type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}

  async createDocumentType(createDocumentTypeDto: CreateDocumentTypeDto) {
    if (!createDocumentTypeDto || !createDocumentTypeDto.doc_t_name) {
      return new HttpException(
        'El nombre del tipo de documento es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!createDocumentTypeDto || !createDocumentTypeDto.doc_t_code) {
      return new HttpException(
        'El codigo del tipo de documento es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findDocumentType = await this.documentTypeRepository.findOne({
      where: {
        doc_t_name: createDocumentTypeDto.doc_t_name,
        doc_t_status: true,
      },
    });

    if (findDocumentType) {
      return new HttpException(
        'El tipo de documento ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const documentType = this.documentTypeRepository.create(
      createDocumentTypeDto,
    );
    await this.documentTypeRepository.save(documentType);

    return new HttpException(
      `¡El tipo de documento ${documentType.doc_t_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllDocumentType() {
    const documentTypes = await this.documentTypeRepository.find({
      where: { doc_t_status: true },
      order: { doc_t_name: 'ASC' },
    });

    if (documentTypes.length === 0) {
      return new HttpException(
        'No se encontró la lista de tipos de documento.',
        HttpStatus.NOT_FOUND,
      );
    }
    return documentTypes;
  }

  async findOneDocumentType(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador del tipo de daño es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const documentType = await this.documentTypeRepository.findOne({
      where: { id, doc_t_status: true },
    });

    if (!documentType) {
      return new HttpException(
        'No se encontró el tipo de documento.',
        HttpStatus.NOT_FOUND,
      );
    }
    return documentType;
  }

  async updateDocumentType(
    id: number,
    updateDocumentTypeDto: UpdateDocumentTypeDto,
  ) {
    if (!updateDocumentTypeDto) {
      return new HttpException(
        'Los datos para actualizar el tipo de documento son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneDocumentType(id);
    const result = await this.documentTypeRepository.update(
      id,
      updateDocumentTypeDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el tipo de documento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteDocumentType(id: number) {
    const documentTypeFound = await this.documentTypeRepository.findOneBy({
      id,
    });

    if (!documentTypeFound) {
      return new HttpException(
        `Tipo de documento no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.documentTypeRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el tipo de documento.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
