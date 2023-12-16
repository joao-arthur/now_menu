import { create } from "zustand";

type OrderItem = {
    readonly itemId: string;
    readonly itemName: string;
    readonly amount: number;
    readonly observation: string;
    readonly prepareTime: number;
};

export type Order = {
    readonly id: string;
    readonly createdAt: string;
    readonly customer: string;
    readonly tableName: string;
    readonly items: readonly OrderItem[];
};

type OrdersStore = {
    readonly orders: readonly Order[];
    readonly setOrders: (orders: readonly Order[]) => void;
};

export const useOrdersStore = create<OrdersStore>((set) => ({
    orders: [],
    setOrders: (orders: readonly Order[]) => set({ orders }),
}));
