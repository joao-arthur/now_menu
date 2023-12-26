import type { MenuItem } from "../menuItem/types";
import type { Table } from "../table/types";

export type OrderItem = {
    readonly id: MenuItem["id"];
    readonly amount: number;
    readonly observation: string;
};

export type Order = {
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly items: readonly OrderItem[];
    readonly tableId: Table["id"];
    readonly customer: string;
    readonly done: boolean;
};

export type OrderRead = {
    readonly id: string;
    readonly items: readonly OrderItem[];
    readonly tableId: string;
    readonly tableName: string;
    readonly customer: string;
    readonly done: boolean;
};

export type OrderCreate = {
    readonly id: string;
    readonly items: readonly OrderItem[];
    readonly tableId: string;
    readonly customer: string;
};
