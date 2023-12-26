export type MenuItem = {
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name: string;
    readonly description: string | undefined;
    readonly prepareTime: number;
    readonly price: number;
};

export type MenuItemCreate = {
    readonly name: MenuItem["name"];
    readonly description: MenuItem["description"];
    readonly prepareTime: MenuItem["prepareTime"];
    readonly price: MenuItem["price"];
    readonly category: string;
};

export type MenuItemUpdate = {
    readonly name: MenuItem["name"];
    readonly description: MenuItem["description"];
    readonly prepareTime: MenuItem["prepareTime"];
    readonly price: MenuItem["price"];
    readonly category: string;
};

export type MenuItemRead = {
    readonly id: MenuItem["id"];
    readonly name: MenuItem["name"];
    readonly description: MenuItem["description"];
    readonly prepareTime: MenuItem["prepareTime"];
    readonly price: MenuItem["price"];
};
