import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/UI/Toaster";
import Head from "next/head";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
    title: "Next.js 13 AppDir (Edge Runtime) + Clerk + TRPC",
    description: "Next.js 13 AppDir (Edge Runtime) + Clerk + TRPC",
};

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <Navbar />
            <Component {...pageProps} className={inter.className} />
            <Toaster />
        </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);

export const config = {
    runtime: "experimental-edge",
    regions: "gru1",
};
