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
    const serviceGood = new FuzzySet('good');

    serviceGood.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 4,
        right: 8,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });

    const serviceBad = new FuzzySet('bad');
    serviceBad.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 2,
        center: 6,
        right: 10,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });

    const foodTasty = new FuzzySet('tasty');
    foodTasty.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 4,
        right: 8,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });
    const foodGross = new FuzzySet('gross');
    foodGross.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 2,
        center: 6,
        right: 10,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });

    const cheapTip = new FuzzySet('cheap');
    cheapTip.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 4,
        right: 8,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });
    const generousTip = new FuzzySet('generous');
    generousTip.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 2,
        center: 6,
        right: 10,
        minValue: 0,
        maxValue: 10,
        step: 1,
      },
    });

    // Then, we tie these fuzzy sets to variables
    const serviceVariable = new LinguisticVariable('service')
      .addSet(serviceGood)
      .addSet(serviceBad);

    const foodVariable = new LinguisticVariable('food')
      .addSet(foodTasty)
      .addSet(foodGross);

    const tipVariable = new LinguisticVariable('tip')
      .addSet(cheapTip)
      .addSet(generousTip);

    // Now that we have variables with sets, we attach them to fuzzy inference system
    const exampleFIS = new FuzzyInferenceSystem('Example')
      .addInput(serviceVariable)
      .addInput(foodVariable)
      .addOutput(tipVariable);

    // Finally we add rules to our system, written in natural language
    // The values must match our variables and their fuzzy sets
    exampleFIS.addRule(
      'IF service IS good AND food IS tasty THEN tip IS generous',
    );
    exampleFIS.addRule('IF service IS bad OR food IS gross THEN tip IS cheap');

    const re = exampleFIS.solve(
      'Mamdani',
      { service: 1, food: 5 },
      DefuzzicationType.Centroid,
    );
    console.log(re);
    return re;
  };
}
