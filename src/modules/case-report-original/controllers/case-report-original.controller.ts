import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  Ip,
  UseGuards,
} from '@nestjs/common';
import { CaseReportOriginalService } from '../services/case-report-original.service';
import { CreateReportOriDto } from '../utils/helpers/ori-dto-validator.helper';
import { UpdateCaseReportOriginalDto } from '../dto/update-case-report-original.dto';
import { CaseReportOriginal } from '../entities/case-report-original.entity';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('case-report-original')
@Controller('case-report-original')
@UseGuards(PermissionGuard)
export class CaseReportOriginalController {
  constructor(
    private readonly CaseReportOriginalService: CaseReportOriginalService,
  ) {}

  @Post('/createReportOriginal')
  async createReportOriginal(
    @Body() createReportOriDto: CreateReportOriDto,
    @Ip() clientIp: string,
  ) {
    return await this.CaseReportOriginalService.createReportOriginal(
      createReportOriDto,
      clientIp,
    );
  }

  @Get('/listReportsOriginal/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  async listReportsOriginal() {
    return await this.CaseReportOriginalService.findAllReportsOriginal();
  }

  @Get('/findReportOriginal/:id/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  async findReportOriginal(
    @Param('id') id: string,
  ) {
    return await this.CaseReportOriginalService.findOneReportOriginal(id);
  }
}
