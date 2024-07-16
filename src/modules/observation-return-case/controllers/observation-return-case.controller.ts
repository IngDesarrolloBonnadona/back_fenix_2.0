import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ObservationReturnCaseService } from '../services/observation-return-case.service';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { ObservationReturnCase } from '../entities/observation-return-case.entity';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Permission } from 'src/decorators/permission.decorator';
import { permissions } from 'src/enums/permissions.enum';

@ApiTags('observation-return-case')
@Controller('observation-return-case')
@UseGuards(PermissionGuard)
export class ObservationReturnCaseController {
  constructor(
    private readonly observationReturnCaseService: ObservationReturnCaseService,
  ) {}

  @Post('/createObservationReturnCase/:idUser/:idCaseValidate')
  @Permission(permissions.SUPER_ADMIN, permissions.ANALYST, permissions.INVESTIGATOR)
  createObservationReturnCase(
    @Param('idUser') idUser: number,
    @Param('idCaseValidate') idCaseValidate: string,
    @Body() createObservationReturnCaseDto: CreateObservationReturnCaseDto,
  ): Promise<HttpException> {
    return this.observationReturnCaseService.createObservationReturnCase(
      createObservationReturnCaseDto,
      idUser,
      idCaseValidate,
    );
  }

  @Get('/listObservationReturnCases')
  listObservationReturnCases(): Promise<ObservationReturnCase[]> {
    return this.observationReturnCaseService.findAllObservationReturnCase();
  }

  @Get('/findObservationReturnCase/:id')
  findObservationReturnCase(@Param('id') id: number): Promise<ObservationReturnCase> {
    return this.observationReturnCaseService.findOneObservationReturnCase(id);
  }

  @Patch('/updateObservationReturnCase/:id/:idCaseValidate')
  @Permission(permissions.SUPER_ADMIN)
  updateObservationReturnCase(
    @Param('id') id: number,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ): Promise<HttpException> {
    return this.observationReturnCaseService.updateObservationReturnCase(
      id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete('deleteObservationReturnCase:id/:idCaseValidate')
  @Permission(permissions.SUPER_ADMIN)
  deleteObservationReturnCase(@Param('id') id: number): Promise<HttpException> {
    return this.observationReturnCaseService.deleteObservationReturnCase(id);
  }
}
