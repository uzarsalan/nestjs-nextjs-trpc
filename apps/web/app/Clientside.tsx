"use client";

import { NodeSubtree } from "@web/components/NodeSubtree";
import DialogAddEmployee from "@web/components/DialogAddEmployee";
import ScrollContainer from "react-indiana-drag-scroll";
import { useContext, useState } from "react";
import { calculatePath } from "@web/utils/svgPath";
import { NodesTree } from "./providers/NodesTree";
import DialogEditEmployee from "@web/components/DialogEditEmployee";
import { EditEmployeeId } from "./providers/EditEmployeeId";

export default function Clientside() {
  const { trees, edges } = useContext(NodesTree);
  const { editingEmployeeId } = useContext(EditEmployeeId);

  return (
    <div className="w-screen h-screen">
      <ScrollContainer>
        <div className="relative p-10 flex flex-col justify-start items-center min-w-max min-h-screen">
          <div className="flex gap-20 shrink-0">
            {trees.map((node) => (
              <div key={node.id} className="flex flex-col gap-10 shrink-0">
                <NodeSubtree nodes={[node]} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none -z-10">
            <svg className="h-full w-full">
              {Object.keys(edges).flatMap((id) =>
                edges.map((edge, index) => (
                  <path
                    key={id + "_" + index}
                    d={calculatePath(edge.start, edge.end)}
                    fill="transparent"
                    stroke="white"
                    strokeWidth="1"
                  ></path>
                ))
              )}
            </svg>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(330deg,hsl(272,53%,50%)_0%,hsl(226,68%,56%)_100%)] -z-20"></div>
        </div>
      </ScrollContainer>
      <div className="absolute bottom-10 right-10">
        <DialogAddEmployee />
      </div>
      <DialogEditEmployee id={editingEmployeeId} />
    </div>
  );
}
