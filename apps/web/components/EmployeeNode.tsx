import { Employee } from "@web/types/trpc";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export function EmployeeNode({ data }: { data: Employee }) {
  return (
    <>
      {data.head && <Handle type="source" position={Position.Top} />}
      <div className="p-2 border border-solid border-white">
        <div>{data.name}</div>
      </div>
      <Handle type="target" position={Position.Bottom} id="a" />
    </>
  );
}
