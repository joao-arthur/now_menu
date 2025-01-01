export type ItemAPI = {
    readonly _id: string;
    readonly userId: string;
    readonly name: string;
    readonly description: string;
    readonly prepareTime: number;
    readonly price: number;
    readonly category: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};

export type ItemToUpdate = Pick<
    ItemAPI,
    | "name"
    | "description"
    | "prepareTime"
    | "price"
>;

export type ItemToSave = Pick<
    ItemAPI,
    | "name"
    | "description"
    | "prepareTime"
    | "price"
    | "category"
>;
