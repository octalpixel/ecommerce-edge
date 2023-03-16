import { api } from "~/utils/api"

export default function CachedPage() {
    const { data } = api.public.slowQueryCached.useQuery()

    return (
        <div>
            Last Cache date = {data && new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
    )
}
export const config = {
    runtime: "experimental-edge",
    regions: "gru1"
}
