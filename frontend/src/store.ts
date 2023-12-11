import { configureStore } from "@reduxjs/toolkit";
import { signUp } from "./Domains/signUp";
import { user } from "./Domains/user";
import { menuRegister } from "./Domains/menuRegister";
import { menuInfo } from "./Domains/menuInfo";
import { orders } from "./Domains/orders";
import { orderRegister } from "./Domains/orderRegister";

export const store = configureStore({
    reducer: {
        user,
        signUp,
        menuInfo,
        menuRegister,
        orders,
        orderRegister,
    },
});

export type appDispatch = typeof store.dispatch;
export type appState = ReturnType<typeof store.getState>;
