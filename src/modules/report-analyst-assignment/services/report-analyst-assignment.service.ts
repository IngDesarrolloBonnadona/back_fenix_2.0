import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportAnalystAssignment as ReportAnalystAssignmentEntity } from '../entities/report-analyst-assignment.entity';
import { Repository } from 'typeorm';
import { Position as PositionEntity } from 'src/modules/position/entities/position.entity';
import { LogService } from 'src/modules/log/services/log.service';
import { logReports } from 'src/enums/logs.enum';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';

@Injectable()
export class ReportAnalystAssignmentService {
  constructor(
    @InjectRepository(ReportAnalystAssignmentEntity)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignmentEntity>,
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,

    private readonly logService: LogService,
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async AssingAnalyst(
    createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    clientIp: string,
    idValidator: number,
  ) {
    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ass_ra_validatedcase_id_fk:
            createAnalystReporterDto.ass_ra_validatedcase_id_fk,
        },
      });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un analista asignado',
        HttpStatus.CONFLICT,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      createAnalystReporterDto.ass_ra_validatedcase_id_fk,
    );

    const positionFind = await this.positionRepository.findOne({
      where: {
        id: createAnalystReporterDto.ass_ra_position_id_fk,
      },
    });

    if (!positionFind) {
      throw new HttpException('El cargo no existe.', HttpStatus.NOT_FOUND);
    }

    await this.logService.createLog(
      createAnalystReporterDto.ass_ra_validatedcase_id_fk,
      idValidator,
      clientIp,
      logReports.LOG_ASSIGNMENT_ANALYST,
    );

    const analyst = this.reportAnalystAssignmentRepository.create(
      createAnalystReporterDto,
    );

    const assigned = await this.reportAnalystAssignmentRepository.save(analyst);

    return assigned;
  }

  async findAllAssignedAnalysts() {
    const analystReporters = await this.reportAnalystAssignmentRepository.find({
      relations: {
        caseReportValidate: true,
        position: true,
      },
    });

    if (!analystReporters || analystReporters.length === 0) {
      throw new HttpException(
        'No se encontró la lista de analistas',
        HttpStatus.NOT_FOUND,
      );
    }

    return analystReporters;
  }

  async findOneAssignedAnalyst(id: number) {
    const analystReporter =
      await this.reportAnalystAssignmentRepository.findOne({
        where: { id },
      });

    if (!analystReporter) {
      throw new HttpException(
        'No se encontró el analista',
        HttpStatus.NOT_FOUND,
      );
    }
    return analystReporter;
  }

  async updateAssignedAnalyst(
    id: number,
    updateAnalystReporterDto: UpdateReportAnalystAssignmentDto,
  ) {
    const analystReporter = await this.findOneAssignedAnalyst(id);
    const result = await this.reportAnalystAssignmentRepository.update(
      analystReporter.id,
      updateAnalystReporterDto,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el cargo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }

  async deleteAssignedAnalyst(id: number) {
    const analystReporter = await this.findOneAssignedAnalyst(id);
    const result = await this.reportAnalystAssignmentRepository.softDelete(
      analystReporter.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(
      `¡Datos eliminados correctamente!`,
      HttpStatus.ACCEPTED,
    );
  }
}
