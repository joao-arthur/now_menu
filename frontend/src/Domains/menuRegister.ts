import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type item = {
    name: string;
    description: string;
    prepareTime: number;
    price: number;
};

type category = {
    name: string;
    items: (item & { id: string })[];
};

type state = {
    categories: category[];
    currentCategory: string | undefined;
    currentItemId: string | undefined;
};

export const { reducer: menuRegister, actions: menuRegisterActions } =
    createSlice({
        name: "menuRegister",
        initialState: {
            categories: [
                { name: "Pratos", items: [] },
                { name: "Bebidas", items: [] },
            ],
            currentCategory: undefined,
            currentItemId: undefined,
        } as state,
        reducers: {
            addCategory: (state, action: PayloadAction<string>) => {
                state.categories.push({
                    name: action.payload,
                    items: [],
                });
            },
            setCurrentCategory: (
                state,
                action: PayloadAction<string>,
            ) => {
                state.currentCategory = action.payload;
            },
            addCategoryItem: (state, action: PayloadAction<item>) => {
                for (const category of state.categories) {
                    if (category.name === state.currentCategory) {
                        category.items.push({
                            ...action.payload,
                            id: nanoid(),
                        });
                        break;
                    }
                }
                state.currentCategory = undefined;
            },
            setCurrentItem: (
                state,
                action: PayloadAction<string | undefined>,
            ) => {
                state.currentItemId = action.payload;
            },
            editCategoryItem: (
                state,
                action: PayloadAction<item>,
            ) => {
                for (const category of state.categories) {
                    for (const item of category.items) {
                        if (item.id === state.currentItemId) {
                            item.description =
                                action.payload.description;
                            item.name = action.payload.name;
                            item.prepareTime =
                                action.payload.prepareTime;
                            item.price = action.payload.price;
                            break;
                        }
                    }
                }
                state.currentItemId = undefined;
            },
            deleteCategory: (
                state,
                action: PayloadAction<string>,
            ) => {
                state.categories = state.categories.filter(
                    ({ name }) => name !== action.payload,
                );
            },
            deleteItem: (state, action: PayloadAction<string>) => {
                for (const category of state.categories) {
                    if (
                        category.items
                            .map(({ id }) => id)
                            .includes(action.payload)
                    ) {
                        category.items = category.items.filter(
                            ({ id }) => id !== action.payload,
                        );
                    }
                }
            },
        },
    });
