import type { HTTPProvider } from "../httpProvider.js";
import type { TableCreate, TableRead } from "./types.js";

export function tableCreate(
    p: HTTPProvider,
    tables: readonly TableCreate[],
): Promise<readonly TableRead[]> {
    return p.post("table", tables);
}

export function tableRead(p: HTTPProvider): Promise<TableRead> {
    return p.get("table");
}

export function tableDelete(p: HTTPProvider, id: string): Promise<void> {
    return p.delete(`table/${id}`);
}
