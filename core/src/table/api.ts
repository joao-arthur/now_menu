import type { ReqMaker } from "../core/reqMaker";
import type { TableCreate, TableRead } from "./types";

function createTable(
    maker: ReqMaker,
    tables: readonly TableCreate[],
): Promise<readonly TableRead[]> {
    return maker.post("table", tables);
}

function readTable(
    maker: ReqMaker,
): Promise<TableRead> {
    return maker.get("table");
}

function deleteTable(
    maker: ReqMaker,
    id: string,
): Promise<void> {
    return maker.delete(`table/${id}`);
}

export const tableAPI = {
    create: createTable,
    read: readTable,
    delete: deleteTable,
} as const;
