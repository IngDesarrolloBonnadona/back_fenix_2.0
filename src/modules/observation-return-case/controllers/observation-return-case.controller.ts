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
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { permissions } from 'src/utils/enums/permissions.enum';

@ApiTags('observation-return-case')
@Controller('observation-return-case')
@UseGuards(PermissionGuard)
export class ObservationReturnCaseController {
  constructor(
    private readonly observationReturnCaseService: ObservationReturnCaseService,
  ) {}

  @Post(
    '/createObservationReturnCase/:idUser/:idCaseValidate/:userIdPermission',
  )
  @Permission(
    permissions.SUPER_ADMIN,
    permissions.ANALYST,
    permissions.INVESTIGATOR,
  )
  createObservationReturnCase(
    @Param('idUser') idUser: number,
    @Param('idCaseValidate') idCaseValidate: string,
    @Body() createObservationReturnCaseDto: CreateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.createObservationReturnCase(
      createObservationReturnCaseDto,
      idUser,
      idCaseValidate,
    );
  }

  @Get('/listObservationReturnCases')
  listObservationReturnCases() {
    return this.observationReturnCaseService.findAllObservationReturnCase();
  }

  @Get('/findObservationReturnCase/:id')
  findObservationReturnCase(
    @Param('id') id: number,
  ) {
    return this.observationReturnCaseService.findOneObservationReturnCase(id);
  }

  @Patch('/updateObservationReturnCase/:id/:idCaseValidate/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  updateObservationReturnCase(
    @Param('id') id: number,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.updateObservationReturnCase(
      id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete('deleteObservationReturnCase:id/:idCaseValidate/:userIdPermission')
  @Permission(permissions.SUPER_ADMIN)
  deleteObservationReturnCase(@Param('id') id: number) {
    return this.observationReturnCaseService.deleteObservationReturnCase(id);
  }
}
