import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Toaster />
            </QueryClientProvider>
        </StrictMode>
    );
}
