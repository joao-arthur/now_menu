import { create } from "zustand";

type OrderItem = {
    readonly id: string;
    readonly amount: number;
    readonly observation: string;
};

type ItemAmount = {
    readonly item: string;
    readonly amount: number;
};

type OrderRegisterStore = {
    readonly items: readonly OrderItem[];
    readonly addItem: (item: OrderItem) => void;
    readonly setAmount: (itemAmount: ItemAmount) => void;
    readonly clear: () => void;
};

export const useOrderRegisterStore = create<OrderRegisterStore>((
    set,
) => ({
    items: [],
    addItem: (item: OrderItem) =>
        set(({ items }) => ({ items: items.concat(item) })),
    setAmount: (itemAmount: ItemAmount) =>
        set(({ items }) => ({
            items: items.map((item) => (item.id === itemAmount.item
                ? { ...item, amount: itemAmount.amount }
                : item)
            ),
        })),
    clear: () => set({ items: [] }),
}));
