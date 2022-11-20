import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  DefuzzicationType,
  FuzzyInferenceSystem,
  FuzzySet,
  LinguisticVariable,
  MembershipFunctionType,
} from 'javascript-fuzzylogic';
import { CreateHiDto } from './dto/create-hi.dto';
import { HI } from './entities/hi.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HIService {
  constructor(
    @InjectRepository(HI)
    private readonly hiRepository: Repository<HI>,
  ) {}
  create(createHiDto: CreateHiDto) {
    const hi = new HI();
    hi.age = 10;
    hi.bmi = 20;
    hi.description = 'oke';
    hi.gi = 20.5;
    hi.name = 'thanh';

    return this.hiRepository.save(hi);
  }

  findAll() {
    const te = this.hi();
    return `This action returns all hi` + te;
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

  hi = () => {
    const good_bmi = new FuzzySet('good_bmi');

    good_bmi.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 0,
        topLeft: 0,
        topRight: 1,
        bottomRight: 1,
        minValue: 0,
        maxValue: 100,
        step: 0.5,
      },
    });

    const overw_bmi = new FuzzySet('overw_bmi');
    overw_bmi.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 2,
        topLeft: 2,
        topRight: 3,
        bottomRight: 3,
        minValue:0,
        maxValue: 100,
        step: 0.5,
      },
    });

    const normal_gi = new FuzzySet('normal_gi');
    normal_gi.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 0,
        topLeft: 0,
        topRight: 1,
        bottomRight: 1,
        minValue: 0,
        maxValue: 100,
        step: 0.5,
      },
    });
    const bad_gi = new FuzzySet('bad_gi');
    bad_gi.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 2,
        topLeft: 2,
        topRight: 3,
        bottomRight: 3,
        minValue: 0,
        maxValue: 100,
        step: 0.5,
      },
    });

    const uh = new FuzzySet('unhealthy');
    uh.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 0,
        topLeft: 0,
        topRight: 1,
        bottomRight: 1,
        minValue: 0,
        maxValue: 100,
        step: 0.5,
      },
    });
    const healthy = new FuzzySet('healthy');
    healthy.generateMembershipValues({
      type: MembershipFunctionType.Trapezoidal,
      parameters: {
        bottomLeft: 2,
        topLeft: 2,
        topRight: 3,
        bottomRight: 3,
        minValue: 0,
        maxValue: 10,
        step: 0.5,
      },
    });
    const bmi = new LinguisticVariable('bmi')
      .addSet(good_bmi)
      .addSet(overw_bmi);

    const gi = new LinguisticVariable('gi')
      .addSet(normal_gi)
      .addSet(bad_gi);

    const hi = new LinguisticVariable('hi')
      .addSet(uh)
      .addSet(healthy);
    const HI_RES = new FuzzyInferenceSystem('HI')
      .addInput(bmi)
      .addInput(gi)
      .addOutput(hi);
    HI_RES.addRule(
      'IF bmi IS good_bmi AND gi IS normal_gi THEN hi IS healthy',
    );
    HI_RES.addRule('IF bmi IS overw_bmi AND gi IS bad_gi THEN hi IS unhealthy');

    const re = HI_RES.solve(
      'Mamdani',
      { bmi: 1, gi: 1 },
      DefuzzicationType.Centroid,
    );
    console.log(re);
    return re;
  };
}
