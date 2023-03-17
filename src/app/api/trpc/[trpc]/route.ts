import type { NextRequest } from "next/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import {appRouter } from "~/server/api/root"
import {db} from "~/server/db"
import { getAuth } from "@clerk/nextjs/server"

export const runtime = "edge"

const handler = (request: NextRequest) => {
    const session = getAuth(request)

    const req = new Request(request.url, {
        headers: request.headers,
        cache: request.cache,
        credentials: request.credentials,
        integrity: request.integrity,
        keepalive: request.keepalive,
        method: request.method,
        mode: request.mode,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        signal: request.signal,
        body: request.body,
    })


    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({ db, session }),
        
        onError({ error }) {
            if (error.code === "INTERNAL_SERVER_ERROR") {
                console.error("Caught TRPC error:", error)
            }
        },

        responseMeta({ ctx, paths, type, errors }) {
            // console.log({ ctx, paths, type, errors });
            
            // assuming you have all your public routes with the keyword `public` in them
            const allPublic =
                paths && paths.every((path) => path.includes("public"))
            // checking that no procedures errored
            const allOk = errors.length === 0
            // checking we're doing a query request
            const isQuery = type === "query"

            // console.log({ allPublic, allOk, isQuery });
            
            if (allPublic && allOk && isQuery) {
                // console.log("Caching response");
                
                // cache request for 1 day + revalidate once every second
                const ONE_DAY_IN_SECONDS = 60 * 60 * 24
                return {
                    headers: {
                        "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                    },
                }
            }
            return {}
        },
    })
}

export { handler as GET, handler as POST }
