import { UserModule } from './services/user/user.module';
import { User } from './services/user/entities/user.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HIController } from './services/health-index/hi.controller';
import { HIService } from './services/health-index/hi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HI } from './services/health-index/entities/hi.entity';
import { HIModule } from './services/health-index/hi.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'exp_sys_hi',
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        // __dirname + '/**/health-index/**/*.entity{.ts,.js}',
        HI,
        User,
      ],
    }),
    HIModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
