import type { ItemAPI } from "../item/item";

export type RestaurantAPI = {
    readonly items: readonly ItemAPI[];
    readonly restaurant: {
        readonly address: string;
        readonly cep: string;
        readonly city: string;
        readonly district: string;
        readonly email: string;
        readonly name: string;
        readonly state: string;
        readonly telephone: string;
    };
};
