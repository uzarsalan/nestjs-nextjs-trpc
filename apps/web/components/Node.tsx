import { EmployeeNodeContextMenu } from "./EmployeeNodeContextMenu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Point } from "@web/utils/svgPath";
import { useWindowSize } from "@web/hooks/useWindowSize";
import { NodesTree } from "@web/app/providers/NodesTree";
import { TreeNode } from "@web/hooks/useNodesTree";

export type ElementPoints = {
  id: string;
  parentId?: string;
  top: Point;
  bottom?: Point | null;
};

export function Node({ node }: { node: TreeNode }) {
  const { setNodeRefs } = useContext(NodesTree);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNodeRefs(node.id, ref);
  }, [ref]);

  return (
    <EmployeeNodeContextMenu id={node.id}>
      <div
        key={node.id}
        ref={ref}
        className="relative text-violet11 shadow-blackA4 inline-flex h-[35px] shrink-0 items-center justify-center rounded-[4px] bg-white px-[15px] pt-[25px] pb-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
      >
        {node.data.name}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 flex flex-col items-center justify-center bg-white border border-solid border-black">
          <PersonIcon />
        </div>
        {node.children.length > 0 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white border border-solid border-black rounded-full w-2 h-2"></div>
        )}
      </div>
    </EmployeeNodeContextMenu>
  );
}
