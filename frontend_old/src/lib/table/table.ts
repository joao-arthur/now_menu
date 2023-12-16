export type TableAPI = {
    readonly _id: string;
    readonly name: string;
    readonly userId: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};

export type TableUnsaved = {
    readonly name: string;
};
