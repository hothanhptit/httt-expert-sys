import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HiService } from './hi.service';
import { CreateHiDto } from './dto/create-hi.dto';

@Controller('hi')
export class HiController {
  constructor(private readonly hiService: HiService) {}

  @Post()
  create(@Body() createHiDto: CreateHiDto) {
    return this.hiService.create(createHiDto);
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
