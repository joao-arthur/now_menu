import type { TableAPI, TableUnsaved } from "./table";
import { useMutation } from "@tanstack/react-query";
import { req } from "@/core/req";
import { Toast } from "@/components/Toast";

export function useGetTables() {
    return useMutation({
        mutationKey: ["getTables"],
        mutationFn: () => req.get<TableAPI[]>("table"),
    });
}

export function usePostTable(tables: readonly TableUnsaved[]) {
    return useMutation({
        mutationKey: ["postTables"],
        mutationFn: () =>
            Toast(req.post("table", tables), {
                loading: "Cadastrando as mesas...",
                error: "Não foi possível cadastrar as mesas!",
                success: "As mesas foram cadastradas com sucesso!",
            }),
    });
}

export function useDeleteTable(id: string) {
    return useMutation({
        mutationKey: ["deleteTable"],
        mutationFn: () =>
            Toast(req.delete(`table/${id}`), {
                loading: "Removendo a mesa...",
                error: "Não foi possível remover a mesa!",
                success: "Mesa removida com sucesso!",
            }),
    });
}
