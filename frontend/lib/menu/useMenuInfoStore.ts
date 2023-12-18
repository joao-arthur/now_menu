import { create } from "zustand";

export type MenuItem = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly prepareTime: number;
    readonly price: number;
};

type Restaurant = {
    readonly address: string;
    readonly cep: string;
    readonly city: string;
    readonly district: string;
    readonly email: string;
    readonly name: string;
    readonly state: string;
    readonly telephone: string;
};

type Category = {
    readonly name: string;
    readonly items: readonly MenuItem[];
};

type MenuInfo = {
    readonly mostOrdered: readonly string[];
    readonly restaurant: Restaurant;
    readonly categories: readonly Category[];
};

const menuInfo: MenuInfo = {
    mostOrdered: [],
    categories: [],
    restaurant: {
        address: "",
        cep: "",
        city: "",
        district: "",
        email: "",
        name: "",
        state: "",
        telephone: "",
    },
};

type MenuInfoStore = {
    readonly menuInfo: MenuInfo;
    readonly loaded: boolean;
    readonly selectedCategory: string;
    readonly search: string;
    readonly setMenu: (menuInfo: MenuInfo) => void;
    readonly setSelectedCategory: (selectedCategory: string) => void;
    readonly setSearch: (search: string) => void;
};

export const useMenuInfoStore = create<MenuInfoStore>((set) => ({
    menuInfo: menuInfo,
    loaded: false,
    selectedCategory: "",
    search: "",
    setMenu: (menuInfo: MenuInfo) =>
        set({
            menuInfo: {
                categories: menuInfo.categories.concat([
                    {
                        name: "Mais baratos",
                        items: menuInfo.categories
                            .flatMap((category) => category.items)
                            .sort((a, b) => a.price - b.price)
                            .slice(0, 5),
                    },
                    {
                        name: "Mais caros",
                        items: menuInfo.categories
                            .flatMap((category) => category.items)
                            .sort((a, b) => b.price - a.price)
                            .slice(0, 5),
                    },
                ]),
                mostOrdered: menuInfo.mostOrdered,
                restaurant: menuInfo.restaurant,
            },
            loaded: true,
            selectedCategory: menuInfo.categories.length ? menuInfo.categories[0].name : "",
        }),
    setSelectedCategory: (selectedCategory: string) => set({ selectedCategory }),
    setSearch: (search: string) => set({ search }),
}));
