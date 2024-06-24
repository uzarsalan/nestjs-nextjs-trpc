"use client";

import { useNodesTree } from "@web/hooks/useNodesTree";
import { PropsWithChildren, useState } from "react";
import { NodesTree } from "./providers/NodesTree";
import { Employee } from "@web/types/trpc";
import { EditEmployeeId } from "./providers/EditEmployeeId";

export function PageProviders({ children }: PropsWithChildren) {
  const nodesTree = useNodesTree([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );
  return (
    <NodesTree.Provider value={nodesTree}>
      <EditEmployeeId.Provider
        value={{ editingEmployeeId, setEditingEmployeeId }}
      >
        {children}
      </EditEmployeeId.Provider>
    </NodesTree.Provider>
  );
}
