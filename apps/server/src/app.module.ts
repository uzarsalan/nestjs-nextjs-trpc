import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '@server/trpc/trpc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Employee]),
  ],
  controllers: [AppController],
  providers: [EmployeeService],
})
export class AppModule {}
