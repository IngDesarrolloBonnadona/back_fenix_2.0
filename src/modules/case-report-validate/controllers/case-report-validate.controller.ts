import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Put,
  Query,
  Ip,
  UseGuards,
} from '@nestjs/common';
import { CaseReportValidateService } from '../services/case-report-validate.service';
import { UpdateCaseReportValidateDto } from '../dto/update-case-report-validate.dto';
import { CaseReportValidate } from '../entities/case-report-validate.entity';
import { ApiTags } from '@nestjs/swagger';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { CreateReportValDto } from '../helper/val-dto-validator.helper';
import { QueryCaseReportValidateDto } from '../dto/query-case-report-validate.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('case-report-validate')
@Controller('case-report-validate')
@UseGuards(PermissionGuard)
export class CaseReportValidateController {
  constructor(
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  @Get('/findReportsSimilar')
  async findReportsSimilar(
    @Body() similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    return await this.caseReportValidateService.findSimilarCaseReportsValidate(
      similarCaseReportValidate,
    );
  }

  @Post('/createReportValidate/:idValidator/:reportId/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  async createReportValidate(
    @Body() createReportValDto: CreateReportValDto,
    @Ip() clientIp: string,
    @Param('reportId') reportId: string,
    @Param('idValidator') idValidator: string,
  ) {
    return await this.caseReportValidateService.createReportValidate(
      createReportValDto,
      clientIp,
      reportId,
      idValidator,
    );
  }

  @Get('/summaryReports')
  async SummaryReports(
    @Query() query: QueryCaseReportValidateDto,
  ) {
    const creationDateObj = query.creationDate
      ? new Date(query.creationDate)
      : undefined;

    return await this.caseReportValidateService.summaryReports(
      creationDateObj,
      query.filingNumber,
      query.statusMovementId,
      query.patientDoc,
      query.caseTypeId,
      query.unitId,
      query.priorityId,
      query.severityClasificationId,
      query.eventTypeId,
    );
  }

  @Get('/summaryReportsForValidator/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  async SummaryReportsForValidator(
    @Query('filingNumber') filingNumber?: string,
    @Query('statusMovementId') statusMovementId?: number,
    @Query('caseTypeId') caseTypeId?: number,
    @Query('patientDoc') patientDoc?: string,
    @Query('priorityId') priorityId?: number,
    @Query('creationDate') creationDate?: string,
  ) {
    const creationDateObj = creationDate ? new Date(creationDate) : undefined;

    return await this.caseReportValidateService.summaryReportsForValidator(
      filingNumber,
      statusMovementId,
      caseTypeId,
      patientDoc,
      priorityId,
      creationDateObj,
    );
  }

  @Get('/summaryReportsForReview/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  async summaryReportsForReview(
    @Query() query: QueryCaseReportValidateDto,
  ) {
    const creationDateObj = query.creationDate
      ? new Date(query.creationDate)
      : undefined;

    return await this.caseReportValidateService.summaryReportsForReview(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.patientDoc,
      query.priorityId,
      creationDateObj,
    );
  }

  @Get('/listReportsValidate')
  listReportsValidate() {
    return this.caseReportValidateService.findAllReportsValidate();
  }

  @Get('/findReportValidate/:id')
  findReportValidate(@Param('id') id: string) {
    return this.caseReportValidateService.findOneReportValidate(id);
  }

  @Get('/findReportValidateByConsecutive/:consecutive')
  findReportValidateByConsecutive(
    @Param('consecutive') consecutive: string,
  ) {
    return this.caseReportValidateService.findOneReportValidateByConsecutive(
      consecutive,
    );
  }

  // @Patch('/updateReportValidate/:id/:userIdPermission')
  // @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  // updateReportValidate(
  //   @Param('id') id: string,
  //   @Body() updateCaseReportValidateDto: UpdateCaseReportValidateDto,
  // ) {
  //   return this.caseReportValidateService.updateReportValidate(
  //     id,
  //     updateCaseReportValidateDto,
  //   );
  // }

  @Delete('/cancelReportValidate/:id/:idUser/:userIdPermission')
  @Permission(
    permissions.SUPER_ADMIN,
    permissions.VALIDATOR,
    permissions.ANALYST,
    permissions.INVESTIGATOR,
  )
  async cancelReportValidate(
    @Param('id') id: string,
    @Ip() clientIp: string,
    @Param('idUser') idUser: string,
  ) {
    return await this.caseReportValidateService.cancelReportValidate(
      id,
      clientIp,
      idUser,
    );
  }
}
