import { INestApplication, Injectable } from '@nestjs/common';
import { EmployeeService } from '@server/employee/employee.service';
import { createEmployeeSchema } from '@server/employee/validation/create-employee.schema';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { deleteEmployeeSchema } from '../employee/validation/delete-employee.schema';
import { updateEmployeeSchema } from '@server/employee/validation/update-employee.schema';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly employeeService: EmployeeService,
  ) {}

  appRouter = this.trpc.router({
    getEmployees: this.trpc.procedure.query(() => {
      return this.employeeService.employees();
    }),
    createEmployee: this.trpc.procedure
      .input(createEmployeeSchema)
      .mutation(({ input }) => {
        return this.employeeService.createEmployee({
          ...input,
          head_id: input.head_id || undefined,
        });
      }),
    deleteEmployee: this.trpc.procedure
      .input(deleteEmployeeSchema)
      .mutation(({ input }) => {
        return this.employeeService.deleteEmployee(input.id);
      }),
    updateEmployee: this.trpc.procedure
      .input(updateEmployeeSchema)
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return this.employeeService.updateEmployee(id, {
          ...data,
          head_id: data.head_id || undefined,
        });
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
