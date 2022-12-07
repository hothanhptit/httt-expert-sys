/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hi } from '../helpers/hi_cacl';
import { CreateHiDto } from './dto/create-hi.dto';
import { HI } from './entities/hi.entity';

@Injectable()
export class HIService {
  constructor(
    @InjectRepository(HI)
    private readonly hiRepository: Repository<HI>
  ) {}
  createHi(request: Request) {
    const res = 1;
    // const res = hi();
    console.log('====================================');
    console.log(request.body);
    console.log('====================================');
    console.log('hi', res);

    return res.toString();
  }

  async findAll() {
    const te = await this.hiRepository.find();
    return `This action returns all hi` + JSON.stringify(te);
  }

  async findOne(id: number) {
    try {
      const hi = await this.hiRepository.findOneBy({
        id: id,
      });
      if (hi) return hi;
      return `Not Found`;
    } catch (error) {
      return `Server err ` + error;
    }
  }

  async remove(id: number) {
    try {
      const hi = await this.hiRepository.findOneBy({
        id: id,
      });

      if (!hi) {
        return `Not Found`;
      }

      await this.hiRepository.delete({
        id: id,
      });
      return hi;
    } catch (error) {
      return `Server err ` + error;
    }
  }
}
