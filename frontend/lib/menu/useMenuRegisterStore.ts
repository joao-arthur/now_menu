import { nanoid } from "nanoid";
import { create } from "zustand";

import { Category, MenuItem, UnsavedMenuItem } from "./menuItem";

type MenuRegisterStore = {
    readonly categories: readonly Category[];
    readonly currentCategory: string | undefined;
    readonly currentItemId: string | undefined;
    readonly setCurrentCategory: (
        currentCategory: string | undefined,
    ) => void;
    readonly setCurrentItemId: (
        currentItemId: string | undefined,
    ) => void;
    readonly addCategory: (category: string) => void;
    readonly deleteCategory: (category: string) => void;
    readonly addItem: (item: UnsavedMenuItem) => void;
    readonly editItem: (item: UnsavedMenuItem) => void;
    readonly deleteItem: (item: string) => void;
};

export const useMenuRegisterStore = create<MenuRegisterStore>((
    set,
) => ({
    categories: [
        { name: "Pratos", items: [] },
        { name: "Bebidas", items: [] },
    ],
    currentCategory: undefined,
    currentItemId: undefined,
    setCurrentCategory: (currentCategory: string | undefined) => set({ currentCategory }),
    setCurrentItemId: (currentItemId: string | undefined) => set({ currentItemId }),
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
    addItem: (item: UnsavedMenuItem) =>
        set(({ categories, currentCategory }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.name === currentCategory
                    ? category.items.concat({ ...item, id: nanoid() })
                    : category.items,
            })),
            currentCategory: undefined,
        })),
    editItem: (item: UnsavedMenuItem) =>
        set(({ categories, currentItemId }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.items.map((
                    oldItem,
                ) => (oldItem.id === currentItemId
                    ? {
                        id: oldItem.id,
                        ...item,
                    }
                    : oldItem)
                ),
            })),
            currentItemId: undefined,
        })),
    deleteItem: (itemId: string) =>
        set(({ categories }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.items.filter((item) => item.id !== itemId),
            })),
        })),
}));
