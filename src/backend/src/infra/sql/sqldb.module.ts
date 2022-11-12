import { Module } from '@nestjs/common';
import { sqldbProviders } from './sqldb.provider';
@Module({
  providers: [...sqldbProviders],
  exports: [...sqldbProviders],
})
export class SQLDBModule {}