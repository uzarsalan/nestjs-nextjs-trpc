import { Edge } from "@web/components/NodeSubtree";
import { Employee } from "@web/types/trpc";
import { Ref, RefObject, useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";
import { trpc } from "@web/utils/trpc";

export type TreeNode = {
  data: Employee;
  children: TreeNode[];
  parentId?: string;
  id: string;
  ref?: RefObject<HTMLDivElement>;
};

export function useNodesTree(employees: Employee[]) {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const windowSize = useWindowSize();

  const [data] = trpc.getEmployees.useSuspenseQuery();

  useEffect(() => {
    setNodes(
      (val) =>
        data?.map((employee) => ({
          id: employee.id,
          type: "employee",
          data: employee,
          parentId: employee.head_id,
          position: { x: 0, y: 0 },
          children: [],
          ref: val.find((item) => item.id === employee.id)?.ref,
        })) ?? []
    );
  }, [data]);

  const parentNodes = nodes.filter((node) => !node.data.head_id);

  const trees = parentNodes.map((node) =>
    populateNodeWithChildren(node, nodes)
  );

  useEffect(() => {
    setEdges(
      nodes
        .map((node) => {
          if (!node.ref?.current) return null;

          const parent = nodes.find((item) => item.id === node.parentId);

          if (!parent || !parent.ref?.current) return null;

          const nodeElRect = node.ref.current.getBoundingClientRect();
          const parentElRect = parent.ref.current.getBoundingClientRect();
          const edge: Edge = {
            start: {
              x: parentElRect.x + parentElRect.width / 2,
              y: parentElRect.y + parentElRect.height,
            },
            end: {
              x: nodeElRect.x + nodeElRect.width / 2,
              y: nodeElRect.y,
            },
          };
          return edge;
        })
        .filter((node) => node) as Edge[]
    );
  }, [nodes, windowSize]);

  function setNodeRefs(id: string, ref: RefObject<HTMLDivElement>) {
    const index = nodes.findIndex((item) => item.id === id);
    if (index >= 0) {
      setNodes((val) => {
        val[index].ref = ref;
        return [...val];
      });
    }
  }

  return { setNodeRefs, edges, trees, employees: data };
}

function populateNodeWithChildren(node: TreeNode, nodes: TreeNode[]): TreeNode {
  return {
    ...node,
    children: nodes
      .filter((item) => item.data.head_id === node.id)
      .map((item) => populateNodeWithChildren(item, nodes)),
  };
}
