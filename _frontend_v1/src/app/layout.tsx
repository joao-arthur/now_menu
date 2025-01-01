"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useWindowSize } from "@uidotdev/usehooks";

type Props = {
    readonly children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    const queryClient = new QueryClient();
    const windowSize = useWindowSize();

    return (
        <html lang="en">
            <body>
                <StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <Toaster />
                        <div
                            className="flex"
                            style={{
                                height: windowSize.height ||
                                    undefined,
                            }}
                        >
                            {children}
                        </div>
                    </QueryClientProvider>
                </StrictMode>
            </body>
        </html>
    );
}