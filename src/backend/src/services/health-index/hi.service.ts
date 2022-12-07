/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'body-parser';
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
    const req = JSON.parse(JSON.stringify(request.body));

    // let { gi, weight, height, ldl, hdl, triglyceride } = req;
    // req.gi
    const gi = parseFloat(req.gi);
    const hdl = parseFloat(req.hdl);
    const ldl = parseFloat(req.ldl);
    const weight = parseFloat(req.weight);
    const height = parseFloat(req.height);
    const triglyceride = parseFloat(req.triglyceride);

    const res = hi(gi, ldl, hdl, triglyceride, weight, height);

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
