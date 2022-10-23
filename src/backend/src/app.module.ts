import { Module } from '@nestjs/common';
import { HiController } from './services/health-index/hi.controller';
import { HiService } from './services/health-index/hi.service';

@Module({
  imports: [],
  controllers: [HiController],
  providers: [HiService],
})
export class AppModule {}
