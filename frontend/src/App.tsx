import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { QueryClient } from "react-query";
import { GlobalStyle } from "./GlobalStyle";
import { Routes } from "./Pages/Routes";
import { store } from "./store";

const queryClient = new QueryClient();

export function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Toaster />
                <GlobalStyle />
                <Provider store={store}>
                    <Routes />
                </Provider>
            </QueryClientProvider>
        </StrictMode>
    );
}
