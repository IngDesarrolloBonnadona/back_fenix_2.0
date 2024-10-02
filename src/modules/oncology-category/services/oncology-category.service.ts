import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOncologyCategoryDto } from '../dto/create-oncology-category.dto';
import { UpdateOncologyCategoryDto } from '../dto/update-oncology-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OncologyCategory as OncologyCategoryEntity } from '../entities/oncology-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OncologyCategoryService {
  constructor(
    @InjectRepository(OncologyCategoryEntity)
    private readonly oncologyCategoryRepository: Repository<OncologyCategoryEntity>,
  ) {}

  async createOncologyCategory(
    createOncologyCategoryDto: CreateOncologyCategoryDto,
  ) {
    if (!createOncologyCategoryDto || !createOncologyCategoryDto.onc_c_name) {
      return new HttpException(
        'El nombre de la categoria oncológica es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findOncologyCategory = await this.oncologyCategoryRepository.findOne({
      where: {
        onc_c_name: createOncologyCategoryDto.onc_c_name,
        onc_c_status: true,
      },
    });

    if (findOncologyCategory) {
      return new HttpException(
        'La categoria oncológica ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const oncologyCategory = this.oncologyCategoryRepository.create(
      createOncologyCategoryDto,
    );
    await this.oncologyCategoryRepository.save(oncologyCategory);

    return new HttpException(
      `¡La categoria ${oncologyCategory.onc_c_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllOncologyCategories() {
    const oncologyCategories = await this.oncologyCategoryRepository.find({
      where: { onc_c_status: true },
      order: { onc_c_name: 'ASC' },
    });

    if (oncologyCategories.length === 0) {
      return new HttpException(
        'No se encontró la lista de la categoria oncológica.',
        HttpStatus.NOT_FOUND,
      );
    }

    return oncologyCategories;
  }

  async findOneOncologyCategory(id: number) {
    if (!id) {
      return new HttpException(
        'El identificador de la categoria oncológica es requerida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const oncologyCategory = await this.oncologyCategoryRepository.findOne({
      where: { id, onc_c_status: true },
    });

    if (!oncologyCategory) {
      return new HttpException(
        'No se encontró la categoria oncológica.',
        HttpStatus.NOT_FOUND,
      );
    }

    return oncologyCategory;
  }

  async updateoncologyCategory(
    id: number,
    updatOncologyCategoryDto: UpdateOncologyCategoryDto,
  ) {
    if (!updatOncologyCategoryDto) {
      return new HttpException(
        'Los datos para actualizar la categoria oncológica son requeridas.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOneOncologyCategory(id);
    const result = await this.oncologyCategoryRepository.update(
      id,
      updatOncologyCategoryDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar la categoria oncológica.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteOncologyCategory(id: number) {
    const oncologyCategoryFound =
      await this.oncologyCategoryRepository.findOneBy({
        id,
      });

    if (!oncologyCategoryFound) {
      return new HttpException(
        `Categoria oncológica no encontrada, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.oncologyCategoryRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar la categoria oncológica.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
