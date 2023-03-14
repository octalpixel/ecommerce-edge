import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/UI/Toaster";
import { TRPCProvider } from "~/utils/api";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <div className={inter.className}>
            <ClerkProvider
                appearance={{
                    baseTheme: dark,
                }}
            >
                <TRPCProvider>
                    <Navbar />
                    {props.children}
                    <Toaster />
                </TRPCProvider>
            </ClerkProvider>
        </div>
    );
}

export const config = {
    runtime: "experimental-edge",
    regions: "gru1",
};
