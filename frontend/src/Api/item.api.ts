import { useMutation } from 'react-query';
import { Fetch } from '../Core/Fetch';

export type itemAPI = {
    _id: string;
    userId: string;
    name: string;
    description: string;
    prepareTime: number;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
};

type restaurantAPI = {
    items: itemAPI[];
    restaurant: {
        address: string;
        cep: string;
        city: string;
        district: string;
        email: string;
        name: string;
        state: string;
        telephone: string;
    };
};

export function useGetUserMenu() {
    return useMutation('getUserMenu', () =>
        Fetch.get<itemAPI[]>('item/menu').then(items => ({
            restaurant: {
                address: '',
                cep: '',
                city: '',
                district: '',
                email: '',
                name: '',
                state: '',
                telephone: ''
            },
            items: items.map(
                ({ _id, name, description, prepareTime, price, category }) => ({
                    category,
                    id: _id,
                    name,
                    description,
                    image: '',
                    prepareTime,
                    price
                })
            )
        }))
    );
}

export function useGetTableMenu(tableId: string) {
    return useMutation('getTableMenu', () =>
        Fetch.get<restaurantAPI>(`item/menu/${tableId}`).then(
            ({ restaurant, items }) => ({
                restaurant,
                items: items.map(
                    ({
                        _id,
                        name,
                        description,
                        prepareTime,
                        price,
                        category
                    }) => ({
                        category,
                        id: _id,
                        name,
                        description,
                        image: '',
                        prepareTime,
                        price
                    })
                )
            })
        )
    );
}

export function useDeleteItem(id: string) {
    return useMutation('deleteItem', () => Fetch.delete(`item/${id}`));
}

type itemToPatch = {
    name: string;
    description: string;
    prepareTime: number;
    price: number;
};

export function usePatchItem(id: string, item: itemToPatch) {
    return useMutation('patchItem', () => Fetch.patch(`item/${id}`, item));
}

type itemToPost = {
    name: string;
    description: string;
    prepareTime: number;
    price: number;
    category: string;
};

export function usePostItem(item: itemToPost) {
    return useMutation('postItem', () => Fetch.post('item', item));
}

export function useGetItem(id: string) {
    return useMutation('getItem', () => Fetch.get<itemAPI>(`item/${id}`));
}
