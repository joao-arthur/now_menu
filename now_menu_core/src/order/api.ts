import type { HTTPProvider } from "../httpProvider.js";
import type { OrderCreate, OrderRead } from "./types.js";

export function orderList(p: HTTPProvider): Promise<readonly OrderRead[]> {
    return p.get("order");
}

export function orderRead(p: HTTPProvider, id: string): Promise<OrderRead> {
    return p.get(`order/${id}`);
}

export function orderPost(p: HTTPProvider, order: OrderCreate): Promise<OrderRead> {
    return p.post("order", order);
}

export function orderSetDone(p: HTTPProvider, id: string): Promise<void> {
    return p.patch(`order/${id}/done`, { done: true });
}
