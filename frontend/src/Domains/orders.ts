import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type order = {
    id: string;
    createdAt: string;
    customer: string;
    tableName: string;
    items: {
        itemId: string;
        itemName: string;
        amount: number;
        observation: string;
        prepareTime: number;
    }[];
};

export const { reducer: orders, actions: ordersActions } =
    createSlice({
        name: "orders",
        initialState: [] as order[],
        reducers: {
            setOrders: (_, action: PayloadAction<order[]>) =>
                action.payload,
        },
    });
