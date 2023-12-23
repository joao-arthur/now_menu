import { useMutation, useQuery } from "@tanstack/react-query";
import { Toast } from "@/comp/Toast";
import { req } from "../core/req";

type OrderItem = {
    readonly itemId: string;
    readonly itemName: string;
    readonly amount: number;
    readonly observation: string;
    readonly prepareTime: number;
    readonly price: number;
};

type OrderFromAPI = {
    readonly _id: string;
    readonly items: readonly OrderItem[];
    readonly tableId: string;
    readonly tableName: string;
    readonly customer: string;
    readonly active: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
};

type OrderToAPI = {
    readonly tableId: string;
    readonly customer: string;
    readonly items: readonly OrderItem[];
};

export function useGetOrders() {
    return useMutation({
        mutationKey: ["ordersList"],
        mutationFn: () =>
            req.get<OrderFromAPI[]>("order").then((orders) =>
                orders.map(
                    (
                        {
                            _id,
                            createdAt,
                            tableId,
                            tableName,
                            customer,
                            items,
                        },
                    ) => ({
                        id: _id,
                        createdAt,
                        tableId,
                        tableName,
                        customer,
                        items,
                    }),
                )
            ),
    });
}

export function useGetOrder(id: string) {
    return useQuery({
        queryKey: ["getOrder", id],
        queryFn: () => req.get<OrderFromAPI>(`order/${id}`),
    });
}

export function usePostOrder(order: OrderToAPI) {
    return useMutation({
        mutationKey: ["registerOrder"],
        mutationFn: () =>
            Toast(req.post("order", order), {
                loading: "Realizando o pedido...",
                error: "Não foi possível fazer o pedido!",
                success: "Pedido realizado com sucesso!",
            }),
    });
}

export function useOrderDone(id: string) {
    return useMutation({
        mutationKey: ["patchOrder", id],
        mutationFn: () => req.patch(`order/${id}`),
    });
}
