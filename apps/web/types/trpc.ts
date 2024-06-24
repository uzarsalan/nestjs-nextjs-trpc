import { AppRouter } from "@server/trpc/trpc.router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Employees = RouterOutput["getEmployees"];
export type Employee = Exclude<RouterOutput["getEmployees"], null>[number];
export type EmployeeInput = RouterInput["createEmployee"];
export type UpdateEmployeeInput = RouterInput["updateEmployee"];
