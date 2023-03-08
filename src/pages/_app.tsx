import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <div className={inter.className}>
            <ClerkProvider
                appearance={{
                    baseTheme: dark,
                }}
            >
                <Component {...pageProps} />
            </ClerkProvider>
        </div>
    );
};

export default api.withTRPC(MyApp);

export const config = {
    runtime: "experimental-edge",
    regions: "gru1"
};
