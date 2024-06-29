import { Injectable } from '@nestjs/common';
import { CreateObservationReturnCaseDto } from '../dto/create-observation-return-case.dto';
import { UpdateObservationReturnCaseDto } from '../dto/update-observation-return-case.dto';

@Injectable()
export class ObservationReturnCaseService {
  create(createObservationReturnCaseDto: CreateObservationReturnCaseDto) {
    return 'This action adds a new observationReturnCase';
  }

  findAll() {
    return `This action returns all observationReturnCase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} observationReturnCase`;
  }

  update(
    id: number,
    updateObservationReturnCaseDto: UpdateObservationReturnCaseDto,
  ) {
    return `This action updates a #${id} observationReturnCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} observationReturnCase`;
  }
}
