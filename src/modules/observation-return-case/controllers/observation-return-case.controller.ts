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

@Controller('observation-return-case')
export class ObservationReturnCaseController {
  constructor(
    private readonly observationReturnCaseService: ObservationReturnCaseService,
  ) {}

  @Post()
  create(
    @Body() createObservationReturnCaseDto: CreateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.create(
      createObservationReturnCaseDto,
    );
  }

  @Get()
  findAll() {
    return this.observationReturnCaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observationReturnCaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    return this.observationReturnCaseService.update(
      +id,
      updateObservationReturnCaseDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.observationReturnCaseService.remove(+id);
  }
}
