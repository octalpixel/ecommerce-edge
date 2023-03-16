import "~/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google"
import { Navbar } from "~/components/Navbar"
import { Toaster } from "~/components/UI/Toaster"
import Head from "next/head"
import { type AppType } from "next/app"
import { api } from "~/utils/api"

const inter = Inter({ subsets: ["latin"] })

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <div className={inter.className}>
            <ClerkProvider
                appearance={{
                    baseTheme: dark,
                }}
            >
                <Head>
                    <title>Next.js 13 (Edge Runtime) + Clerk + TRPC</title>
                    <meta
                        name="description"
                        content="Next.js 13 (Edge Runtime) + Clerk + TRPC"
                    />
                </Head>
                <Navbar />
                <Component {...pageProps} />
                <Toaster />
            </ClerkProvider>
        </div>
    )
}
// export default MyApp;

export default api.withTRPC(MyApp)

export const config = {
    runtime: "experimental-edge",
    regions: "gru1",
}
