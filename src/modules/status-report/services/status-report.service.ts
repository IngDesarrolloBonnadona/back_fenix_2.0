import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatusReportDto } from '../dto/create-status-report.dto';
import { UpdateStatusReportDto } from '../dto/update-status-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusReport as StatusReportEntity } from '../entities/status-report.entity';
import { QueryRunner, Repository } from 'typeorm';
import { MovementReport as MovementReportEntity} from 'src/modules/movement-report/entities/movement-report.entity';
import { movementReport } from 'src/enums/movement-report.enum';
import { Query } from 'typeorm/driver/Query';

@Injectable()
export class StatusReportService {
  constructor(
    @InjectRepository(StatusReportEntity)
    private readonly statusReportRepository: Repository<StatusReportEntity>,
    @InjectRepository(MovementReportEntity)
    private readonly movementReportRepository: Repository<MovementReportEntity>
  ){}

  async createStatusReportTransaction(
    queryRunner: QueryRunner,
    caseReportOriginalId: any
  ) {
    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name : movementReport.REPORT_CREATION,
        mov_r_status : true
      }
    })

    if (!movementReportFound) {
      throw new HttpException(
        `El movimiento ${movementReport.REPORT_CREATION} no existe.`,
        HttpStatus.NOT_FOUND
      )
    }

    const statusReport = this.statusReportRepository.create({
    sta_r_originalcase_id_fk: caseReportOriginalId,
    sta_r_movement_id_fk: movementReportFound.id
  })

    return await queryRunner.manager.save(statusReport)
  }

  async createStatusReport(createStatusReportDto: CreateStatusReportDto) {
    const statusReport = this.statusReportRepository.create(createStatusReportDto);
    return await this.statusReportRepository.save(statusReport);
  }

  async findAllStatusReports() {
    const statusReports = await this.statusReportRepository.find({
      relations: {
        movementReport: true,
        caseReportOriginal: true
      }
    })

    if (!statusReports) {
      throw new HttpException(
        'No se encontró la lista de estado de reportes',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusReports
  }

  async findOneStatusReport(id: number) {
    const statusReport = await this.statusReportRepository.findOne({ where: { id } });

    if (!statusReport) {
      throw new HttpException(
        'No se encontró el estado de reporte',
        HttpStatus.NOT_FOUND,
      );
    }

    return statusReport
  }

  async updateStatusReport(id: number, updateStatusReportDto: UpdateStatusReportDto) {
    const statusReport = await this.findOneStatusReport(id);
    const result = await this.statusReportRepository.update(statusReport.id, updateStatusReportDto);
    
    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el estado del reporte`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } 
    
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    ); 
  }

  async deleteStatusReport(id: number) {
    const statusReport = await this.findOneStatusReport(id);
    const result = await this.statusReportRepository.softDelete(statusReport.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el estado del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }  
    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
