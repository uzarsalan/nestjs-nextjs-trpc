"use client";

import { PropsWithChildren } from "react";
import { trpc } from "@web/utils/trpc";

export const Providers = trpc.withTRPC(({ children }: PropsWithChildren) => {
  return children;
});
