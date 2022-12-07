import {
  Controller, Delete, Get, Param, Post
} from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { HIService } from './hi.service';

@Controller('hi')
export class HIController {
  constructor(private readonly hiService: HIService) {}

  @Post()
  create(@Req() request): string {
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
