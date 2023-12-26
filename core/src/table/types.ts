export type Table = {
    readonly id: string;
    readonly name: string;
    readonly userId: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};

export type TableCreate = {
    readonly name: Table["name"];
};

export type TableRead = {
    readonly id: Table["id"];
    readonly name: Table["name"];
};
