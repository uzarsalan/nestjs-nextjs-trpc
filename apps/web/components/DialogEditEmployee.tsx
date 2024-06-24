import React, { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { UpdateEmployeeInput } from "@web/types/trpc";
import { EmployeeForm } from "./EmployeeForm";
import { EditEmployeeId } from "@web/app/providers/EditEmployeeId";
import { trpc } from "@web/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

const DialogEditEmployee = ({ id }: { id?: string | null }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateEmployee } = trpc.updateEmployee.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries();
      setEditingEmployeeId && setEditingEmployeeId(null);
    },
  });
  const { setEditingEmployeeId } = useContext(EditEmployeeId);

  return (
    <Dialog.Root
      open={!!id}
      onOpenChange={() => setEditingEmployeeId && setEditingEmployeeId(null)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <EmployeeForm
            id={id}
            onSubmitForm={async (data) => {
              if (!id) return;
              await updateEmployee({ ...data, id });
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogEditEmployee;
