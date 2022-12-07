/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { HIService } from "./hi.service";
import { HIController } from "./hi.controller";
import { SQLDBModule } from "src/infra/sql/sqldb.module";
import { HI } from "./entities/hi.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([HI])],
  controllers: [HIController],
  providers: [HIService],
})
export class HIModule {}
