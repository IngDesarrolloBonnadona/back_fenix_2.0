import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ObservationReturnCaseService } from '../services/observation-return-case.service';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { ObservationReturnCase } from '../entities/observation-return-case.entity';

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

  @Patch('/updateObservationReturnCase/:id')
  updateObservationReturnCase(
    @Param('id') id: number,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ): Promise<HttpException> {
    return this.observationReturnCaseService.updateObservationReturnCase(
      id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete('deleteObservationReturnCase:id')
  deleteObservationReturnCase(@Param('id') id: number): Promise<HttpException> {
    return this.observationReturnCaseService.deleteObservationReturnCase(id);
  }
}
