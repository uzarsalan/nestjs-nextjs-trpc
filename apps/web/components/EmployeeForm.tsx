import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeeSchema } from "@server/employee/validation/create-employee.schema";
import { Employee, EmployeeInput } from "@web/types/trpc";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import React from "react";
import classnames from "classnames";
import { trpc } from "@web/utils/trpc";
import classNames from "classnames";

type Values = EmployeeInput;

function getChildrens(parent: Employee, allEmployees: Employee[]): Employee[] {
  return allEmployees
    .filter((item) => item.head_id === parent.id)
    .flatMap((item) => [item, ...getChildrens(item, allEmployees)]);
}

export function EmployeeForm<T>({
  id,
  onSubmitForm,
}: {
  id?: string | null;
  onSubmitForm?: (data: Values) => Promise<T>;
}) {
  const { data: employees } = trpc.getEmployees.useQuery();

  const employee = employees?.find((item) => item.id === id);

  const childrens =
    employee && employees ? getChildrens(employee, employees) : [];

  const filteredEmployees = employees?.filter(
    (item) =>
      !employee ||
      (item.id !== employee.id &&
        !childrens.some((child) => child.id === item.id))
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(createEmployeeSchema),
    values: {
      name: employee?.name ?? "",
      head_id: employee?.head_id ?? null,
    },
  });

  const onSubmit: SubmitHandler<Values> = async (data) => {
    onSubmitForm &&
      (await onSubmitForm({
        ...data,
        head_id: data.head_id && data.head_id !== "null" ? data.head_id : null,
      }));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
        {id ? "Редактирование сотрудника" : "Новый сотрудник"}
      </Dialog.Title>
      <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        Измените имя или руководителя сотрудника
      </Dialog.Description>
      {!!errors.name && (
        <div className="text-red-500 text-xs text-right">
          {errors.name.message?.toString()}
        </div>
      )}
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="name"
        >
          Имя
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          placeholder="Введите имя"
          {...register("name")}
        />
      </fieldset>
      {!!errors.head_id && (
        <div className="text-red-500 text-xs text-right">
          {errors.head_id.message?.toString()}
        </div>
      )}
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="head_id"
        >
          Руководитель
        </label>
        <Controller
          name="head_id"
          control={control}
          render={({ field }) => (
            <Select.Root
              value={field.value ?? undefined}
              onValueChange={(val) => field.onChange(val ?? null)}
            >
              <Select.Trigger
                className="w-full inline-flex items-center justify-between rounded px-[15px] text-[15px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                aria-label="Food"
              >
                <Select.Value placeholder="Выберите руководителя" />
                <Select.Icon className="text-violet11">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                  <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-[5px]">
                    <Select.Group>
                      {[
                        {
                          id: "null",
                          name: "Нет руководителя",
                          value: "null",
                        },
                        ...(filteredEmployees ?? []),
                      ]?.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          )}
        />
      </fieldset>
      <div className="mt-[25px] flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={classNames(
            "bg-green4 text-green11 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none",
            isSubmitting
              ? "bg-gray-100 hover:bg-gray-100"
              : "bg-green4 hover:bg-green5"
          )}
        >
          {isSubmitting ? "Сохранение..." : id ? "Сохранить" : "Создать"}
        </button>
      </div>
      <Dialog.Close asChild>
        <button
          type="button"
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Закрыть"
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </form>
  );
}

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  (
    { children, className, value, ...props }: Select.SelectItemProps,
    forwardedRef
  ) => {
    return (
      <Select.Item
        className={classnames(
          "text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        value={value}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
