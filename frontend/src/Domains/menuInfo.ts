import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type item = {
    id: string;
    name: string;
    description: string;
    image: string;
    prepareTime: number;
    price: number;
};

type restaurant = {
    address: string;
    cep: string;
    city: string;
    district: string;
    email: string;
    name: string;
    state: string;
    telephone: string;
};

type menuInfoType = {
    mostOrdered: string[];
    restaurant: restaurant;
    categories: {
        name: string;
        items: item[];
    }[];
};

type menuType = menuInfoType & {
    loaded: boolean;
    selectedCategory: string;
    search: string;
};

export const { reducer: menuInfo, actions: menuInfoActions } = createSlice({
    name: 'menuInfo',
    initialState: {
        mostOrdered: [],
        categories: [],
        loaded: false,
        selectedCategory: '',
        restaurant: {
            address: '',
            cep: '',
            city: '',
            district: '',
            email: '',
            name: '',
            state: '',
            telephone: ''
        },
        search: ''
    } as menuType,
    reducers: {
        loadMenu: (state, action: PayloadAction<menuInfoType>) => {
            state.categories = action.payload.categories.concat([
                {
                    name: 'Mais baratos',
                    items: action.payload.categories
                        .flatMap(category => category.items)
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 5)
                },
                {
                    name: 'Mais caros',
                    items: action.payload.categories
                        .flatMap(category => category.items)
                        .sort((a, b) => b.price - a.price)
                        .slice(0, 5)
                }
            ]);
            state.mostOrdered = action.payload.mostOrdered;
            state.restaurant = action.payload.restaurant;
            state.loaded = true;
            if (action.payload.categories.length)
                state.selectedCategory = action.payload.categories[0].name;
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});
