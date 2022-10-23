import { Module } from '@nestjs/common';
import { HiService } from './hi.service';
import { HiController } from './hi.controller';

@Module({
  controllers: [HiController],
  providers: [HiService]
})
export class HiModule {}
