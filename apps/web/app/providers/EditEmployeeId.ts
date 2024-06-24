import { createContext } from "react";

export let EditEmployeeId = createContext<{
  editingEmployeeId?: string | null;
  setEditingEmployeeId?: (value: string | null) => any;
}>({});
