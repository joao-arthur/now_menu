import { create } from "zustand";
import type { OrderRead } from "now_menu_core";

type OrdersStore = {
    readonly orders: readonly OrderRead[];
    readonly setOrders: (orders: readonly OrderRead[]) => void;
};

export const useOrdersStore = create<OrdersStore>((set) => ({
    orders: [],
    setOrders: (orders: readonly OrderRead[]) => set({ orders }),
}));
