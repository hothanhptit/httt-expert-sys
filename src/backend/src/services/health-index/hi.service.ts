import { Injectable } from '@nestjs/common';
import { CreateHiDto } from './dto/create-hi.dto';

@Injectable()
export class HiService {
  create(createHiDto: CreateHiDto) {
    return;
  }

  findAll() {
    return `This action returns all hi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hi`;
  }

  remove(id: number) {
    return `This action removes a #${id} hi`;
  }
}
