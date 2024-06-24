import React, { PropsWithChildren, useContext } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@web/app/trpc";
import { EditEmployeeId } from "@web/app/providers/EditEmployeeId";

export const EmployeeNodeContextMenu = ({
  children,
  id,
}: PropsWithChildren<{ id: string }>) => {
  const queryClient = useQueryClient();
  const { mutate: deleteEmployee } = useMutation({
    mutationKey: ["employees"],
    mutationFn: () => trpc.deleteEmployee.query({ id }),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
  const { setEditingEmployeeId } = useContext(EditEmployeeId);
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <ContextMenu.Item
            onClick={() => deleteEmployee()}
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Удалить
          </ContextMenu.Item>
          <ContextMenu.Item
            onClick={() => setEditingEmployeeId && setEditingEmployeeId(id)}
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Изменить
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
