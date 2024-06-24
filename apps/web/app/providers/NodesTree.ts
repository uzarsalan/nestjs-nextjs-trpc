import { useNodesTree } from "@web/hooks/useNodesTree";
import { createContext } from "react";

export let NodesTree = createContext<ReturnType<typeof useNodesTree>>({
  edges: [],
  setNodeRefs: () => {},
  trees: [],
  employees: null,
});
