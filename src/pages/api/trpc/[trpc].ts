import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server";

/**
 * Edge runtime fetch adapter
 */
export default async function handler(req: NextRequest) {
    const session = getAuth(req);

    return fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: () => ({ db, session }),
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                    console.error(
                        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message
                        }`
                    );
                }
                : undefined,
        responseMeta({ ctx, paths, type, errors }) {
            // assuming you have all your public routes with the keyword `public` in them
            const allPublic = paths && paths.every((path) => path.includes('public'));
            // checking that no procedures errored
            const allOk = errors.length === 0;
            // checking we're doing a query request
            const isQuery = type === 'query';
            //@ts-expect-error res exists
            if (ctx?.res && allPublic && allOk && isQuery) {
                // cache request for 1 day + revalidate once every second
                const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
                return {
                    headers: {
                        'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                    },
                };
            }
            return {};
        },
    });
}

export const config = {
    runtime: "edge",
    regions: "gru1"
};
