/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HIService } from './hi.service';
import { CreateHiDto } from './dto/create-hi.dto';
import { Req } from '@nestjs/common/decorators';

@Controller('hi')
export class HIController {
  constructor(private readonly hiService: HIService) {}

  @Post()
  create(@Req() request: Request): string {
    return this.hiService.createHi(request);
  }

  @Get()
  findAll() {
    return this.hiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiService.remove(+id);
  }
}
