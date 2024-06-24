import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';

@Controller()
export class AppController {
  constructor(private readonly employeeService: EmployeeService) {}
}
