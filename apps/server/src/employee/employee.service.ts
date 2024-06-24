import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async employees(
    options?: FindManyOptions<Employee>,
  ): Promise<Employee[] | null> {
    return this.employeesRepository.find(options);
  }

  async createEmployee(
    data: QueryDeepPartialEntity<Employee>,
  ): Promise<InsertResult> {
    return this.employeesRepository.insert(data);
  }

  async updateEmployee(
    id: string,
    data: QueryDeepPartialEntity<Employee>,
  ): Promise<UpdateResult> {
    return this.employeesRepository.update(id, data);
  }

  async deleteEmployee(id: string): Promise<DeleteResult> {
    return this.employeesRepository.delete(id);
  }
}
