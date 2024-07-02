import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservationReturnCaseService } from '../services/observation-return-case.service';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('observation-return-case')
@Controller('observation-return-case')
export class ObservationReturnCaseController {
  constructor(
    private readonly observationReturnCaseService: ObservationReturnCaseService,
  ) {}

  @Post('/createObservationReturnCase/:idUser/:idCaseValidate')
  createObservationReturnCase(
    @Param('idUser') idUser: number,
    @Param('idCaseValidate') idCaseValidate: string,
    @Body() createObservationReturnCaseDto: CreateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.create(
      createObservationReturnCaseDto,
      idUser,
      idCaseValidate
    );
  }

  @Get('/listObservationReturnCases')
  listObservationReturnCases() {
    return this.observationReturnCaseService.findAllObservationReturnCase();
  }

  @Get('/findObservationReturnCase/:id')
  findObservationReturnCase(@Param('id') id: number) {
    return this.observationReturnCaseService.findOneObservationReturnCase(id);
  }

  @Patch('/updateObservationReturnCase/:id')
  updateObservationReturnCase(
    @Param('id') id: number,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.updateObservationReturnCase(
      id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete('deleteObservationReturnCase:id')
  deleteObservationReturnCase(@Param('id') id: number) {
    return this.observationReturnCaseService.deleteObservationReturnCase(id);
  }
}
