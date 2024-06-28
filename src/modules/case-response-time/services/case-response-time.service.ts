import { Injectable } from '@nestjs/common';
import { CreateCaseResponseTimeDto } from '../dto/create-case-response-time.dto';
import { UpdateCaseResponseTimeDto } from '../dto/update-case-response-time.dto';

@Injectable()
export class CaseResponseTimeService {
  create(createCaseResponseTimeDto: CreateCaseResponseTimeDto) {
    return 'This action adds a new caseResponseTime';
  }

  findAll() {
    return `This action returns all caseResponseTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caseResponseTime`;
  }

  update(id: number, updateCaseResponseTimeDto: UpdateCaseResponseTimeDto) {
    return `This action updates a #${id} caseResponseTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} caseResponseTime`;
  }
}
