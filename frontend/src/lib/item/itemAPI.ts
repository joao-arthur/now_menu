import { useMutation } from "@tanstack/react-query";
import { req } from "@/core/req";



export function useGetUserMenu() {
    return useMutation({
        mutationKey: ["getUserMenu"],
        mutationFn: () =>
            req.get<ItemAPI[]>("item/menu").then((items) => ({
                restaurant: {
                    address: "",
                    cep: "",
                    city: "",
                    district: "",
                    email: "",
                    name: "",
                    state: "",
                    telephone: "",
                },
                items: items.map(
                    (
                        {
                            _id,
                            name,
                            description,
                            prepareTime,
                            price,
                            category,
                        },
                    ) => ({
                        category,
                        id: _id,
                        name,
                        description,
                        image: "",
                        prepareTime,
                        price,
                    }),
                ),
            })),
    });
}

export function useGetTableMenu(tableId: string) {
    return useMutation({
        mutationKey: ["getTableMenu"],
        mutationFn: () =>
            req.get<RestaurantAPI>(`item/menu/${tableId}`).then(
                ({ restaurant, items }) => ({
                    restaurant,
                    items: items.map(
                        ({
                            _id,
                            name,
                            description,
                            prepareTime,
                            price,
                            category,
                        }) => ({
                            category,
                            id: _id,
                            name,
                            description,
                            image: "",
                            prepareTime,
                            price,
                        }),
                    ),
                }),
            ),
    });
}

export function useDeleteItem(id: string) {
    return useMutation({
        mutationKey: ["deleteItem"],
        mutationFn: () => req.delete(`item/${id}`),
    });
}

export function usePatchItem(id: string, item: ItemToUpdate) {
    return useMutation({
        mutationKey: ["patchItem"],
        mutationFn: () => req.patch(`item/${id}`, item),
    });
}

export function usePostItem(item: ItemToSave) {
    return useMutation({
        mutationKey: ["postItem"],
        mutationFn: () => req.post("item", item),
    });
}

export function useGetItem(id: string) {
    return useMutation({
        mutationKey: ["getItem"],
        mutationFn: () => req.get<ItemAPI>(`item/${id}`),
    });
}
