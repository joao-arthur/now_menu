import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type item = {
    id: string;
    amount: number;
    observation: string;
};

type amountPayload = {
    id: string;
    amount: number;
};

export const {
    reducer: orderRegister,
    actions: orderRegisterActions,
} = createSlice({
    name: "orderRegister",
    initialState: [] as item[],
    reducers: {
        addItem: (state, action: PayloadAction<item>) => {
            state.push(action.payload);
        },
        setAmount: (state, action: PayloadAction<amountPayload>) => {
            for (const item of state) {
                if (item.id === action.payload.id) {
                    item.amount = action.payload.amount;
                    break;
                }
            }
        },
        clear: () => [],
    },
});
