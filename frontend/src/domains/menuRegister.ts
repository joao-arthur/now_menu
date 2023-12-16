import { nanoid } from "nanoid";
import { create } from "zustand";

type Item = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly prepareTime: number;
    readonly price: number;
};

type UnsavedItem = Omit<Item, "id">;

type Category = {
    readonly name: string;
    readonly items: readonly Item[];
};

type MenuRegisterStore = {
    readonly categories: readonly Category[];
    readonly currentCategory: string | undefined;
    readonly currentItemId: string | undefined;
    readonly setCurrentCategory: (currentCategory: string|undefined) => void;
    readonly setCurrentItemId: (currentItemId: string|undefined) => void;
    readonly addCategory: (category: string) => void;
    readonly deleteCategory: (category: string) => void;
    readonly addItem: (item: UnsavedItem) => void;
    readonly editItem: (item: UnsavedItem) => void;
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
    setCurrentCategory: (currentCategory: string | undefined) =>
        set({ currentCategory }),
    setCurrentItemId: (currentItemId: string | undefined) =>
        set({ currentItemId }),
    addCategory: (category: string) =>
        set(({ categories }) => ({
            categories: categories.concat([{
                name: category,
                items: [],
            }]),
        })),
    deleteCategory: (category: string) =>
        set(({ categories }) => ({
            categories: categories.filter(({ name }) =>
                name !== category
            ),
        })),
    addItem: (item: UnsavedItem) =>
        set(({ categories, currentCategory }) => ({
            categories: categories.map((category) => ({
                name: category.name,
                items: category.name === currentCategory
                    ? category.items.concat({ ...item, id: nanoid() })
                    : category.items,
            })),
            currentCategory: undefined,
        })),
    editItem: (item: UnsavedItem) =>
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
                items: category.items.filter((item) =>
                    item.id !== itemId
                ),
            })),
        })),
}));
