import "~/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs/app-beta"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google"
import { Navbar } from "~/components/Navbar"
import { Toaster } from "~/components/UI/Toaster"
import { TRPCProvider } from "~/utils/api"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Next.js 13 AppDir (Edge Runtime) + Clerk + TRPC",
    description: "Next.js 13 AppDir (Edge Runtime) + Clerk + TRPC",
}

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <ClerkProvider
                appearance={{
                    baseTheme: dark,
                }}
            >
                <TRPCProvider>
                    <body className={inter.className}>
                        <Navbar />
                        <main>{props.children}</main>
                        <Toaster />
                    </body>
                </TRPCProvider>
            </ClerkProvider>
        </html>
    )
}
