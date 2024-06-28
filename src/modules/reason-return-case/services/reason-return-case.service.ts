import { Injectable } from '@nestjs/common';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';

@Injectable()
export class ReasonReturnCaseService {
  create(createReasonReturnCaseDto: CreateReasonReturnCaseDto) {
    return 'This action adds a new reasonReturnCase';
  }

  findAll() {
    return `This action returns all reasonReturnCase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reasonReturnCase`;
  }

  update(id: number, updateReasonReturnCaseDto: UpdateReasonReturnCaseDto) {
    return `This action updates a #${id} reasonReturnCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} reasonReturnCase`;
  }
}
