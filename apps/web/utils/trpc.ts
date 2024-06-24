import { AppRouter } from "@server/trpc/trpc.router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { ssrPrepass } from "@trpc/next/ssrPrepass";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_NESTJS_SERVER;
}

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== "undefined") {
      return {
        links: [
          httpBatchLink({
            url: `${getBaseUrl()}/trpc`,
          }),
        ],
      };
    }

    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
});
