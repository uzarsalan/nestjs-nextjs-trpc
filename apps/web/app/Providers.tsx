"use client";

import { PropsWithChildren, ReactElement } from "react";
import { trpc } from "@web/utils/trpc";
import { NextComponentType, NextPageContext } from "next";

export const Providers = trpc.withTRPC(
  ({ children }: { children: ReactElement<any, any> | null }) => {
    return children;
  }
) as NextComponentType<NextPageContext, PropsWithChildren, PropsWithChildren>;
