import { nanoid } from "nanoid";
import { create } from "zustand";

import { Category, MenuItem, UnsavedMenuItem } from "./menuItem";

type MenuRegisterStore = {
    readonly categories: readonly Category[];
    readonly addCategory: (category: string) => void;
    readonly deleteCategory: (category: string) => void;
    readonly addItem: (item: UnsavedMenuItem, category: string) => void;
    readonly editItem: (newItem: MenuItem) => void;
    readonly deleteItem: (itemId: string) => void;
};

export const useMenuRegisterStore = create<MenuRegisterStore>((
    set,
) => ({
    categories: [
        { name: "Pratos", items: [] },
        { name: "Bebidas", items: [] },
    ],
    addCategory: (category: string) =>
        set(({ categories }) => ({
            categories: categories.concat([{
                name: category,
                items: [],
            }]),
        })),
    deleteCategory: (category: string) =>
        set(({ categories }) => ({
            categories: categories.filter(({ name }) => name !== category),
        })),
    addItem: (item: UnsavedMenuItem, category: string) =>
        set(({ categories }) => ({
            categories: categories.map((c) => ({
                name: c.name,
                items: c.name === category ? c.items.concat({ ...item, id: nanoid() }) : c.items,
            })),
            currentCategory: undefined,
        })),
    editItem: (newItem: MenuItem) =>
        set(({ categories }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.items.map((
                    oldItem,
                ) => (oldItem.id === newItem.id ? newItem : oldItem)),
            })),
        })),
    deleteItem: (itemId: string) =>
        set(({ categories }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.items.filter((item) => item.id !== itemId),
            })),
        })),
}));
