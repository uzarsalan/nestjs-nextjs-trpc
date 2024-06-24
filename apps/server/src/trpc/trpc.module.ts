import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '@server/employee/employee.entity';
import { EmployeeService } from '@server/employee/employee.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { TrpcService } from '@server/trpc/trpc.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [TrpcService, TrpcRouter, EmployeeService],
})
export class TrpcModule {}
