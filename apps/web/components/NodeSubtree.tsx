import { useCallback, useEffect, useState } from "react";
import { ElementPoints, Node } from "./Node";
import { start } from "repl";
import { Point } from "@web/utils/svgPath";
import { TreeNode } from "@web/hooks/useNodesTree";

export type Edge = { start: Point; end: Point };

export function NodeSubtree({ nodes }: { nodes: (TreeNode | null)[] }) {
  const childrens = nodes.flatMap((node) =>
    node?.children.length
      ? node.children.map((child) => ({ ...child, parentId: node.id }))
      : [null]
  );

  return (
    <>
      <div className="flex gap-4 justify-around shrink-0">
        {nodes.map((node, index) =>
          node ? <Node node={node} key={node.id} /> : <div key={index} />
        )}
      </div>
      {childrens.length > 0 && childrens.some((child) => child) && (
        <NodeSubtree nodes={childrens} />
      )}
    </>
  );
}
