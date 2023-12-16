export type MenuItem = {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly prepareTime: number;
    readonly price: number;
};

export type UnsavedMenuItem = Omit<MenuItem, "id">;

export type Category = {
    readonly name: string;
    readonly items: readonly MenuItem[];
};