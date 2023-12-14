import { useMutation, useQuery } from "@tanstack/react-query";
import { Fetch } from "../Core/Fetch";
import { Toast } from "../Components/Toast";

type orderFromAPI = {
    _id: string;
    items: {
        itemId: string;
        itemName: string;
        amount: number;
        observation: string;
        prepareTime: number;
        price: number;
    }[];
    tableId: string;
    tableName: string;
    customer: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};

type orderToAPI = {
    tableId: string;
    customer: string;
    items: {
        itemId: string;
        itemName: string;
        amount: number;
        observation: string;
        prepareTime: number;
        price: number;
    }[];
};

export function useGetOrders() {
    return useMutation({
        mutationKey: ["ordersList"],
        mutationFn: () =>
            Fetch.get<orderFromAPI[]>("order").then((orders) =>
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
        queryFn: () => Fetch.get<orderFromAPI>(`order/${id}`),
    });
}

export function usePostOrder(order: orderToAPI) {
    return useMutation({
        mutationKey: ["registerOrder"],
        mutationFn: () =>
            Toast(Fetch.post("order", order), {
                loading: "Realizando o pedido...",
                error: "Não foi possível fazer o pedido!",
                success: "Pedido realizado com sucesso!",
            }),
    });
}

export function useOrderDone(id: string) {
    return useMutation({
        mutationKey: ["patchOrder", id],
        mutationFn: () => Fetch.patch(`order/${id}`),
    });
}
