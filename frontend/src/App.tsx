import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { QueryClient } from "@tanstack/react-query";
import { AppRoutes } from "./Pages/Routes";
import { store } from "./store";

const queryClient = new QueryClient();

export function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                    <AppRoutes />
            </QueryClientProvider>
        </StrictMode>
    );
}
