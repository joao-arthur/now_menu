import type { ReqMaker } from "../core/reqMaker.js";
import type { OrderCreate, OrderRead } from "./types.js";

function listOrder(maker: ReqMaker): Promise<readonly OrderRead[]> {
    return maker.get("order");
}

function readOrder(maker: ReqMaker, id: string): Promise<OrderRead> {
    return maker.get(`order/${id}`);
}

function postOrder(maker: ReqMaker, order: OrderCreate): Promise<OrderRead> {
    return maker.post("order", order);
}

function setDoneOrder(maker: ReqMaker, id: string): Promise<void> {
    return maker.patch(`order/${id}/done`, { done: true });
}

export const orderAPI = {
    listOrder,
    readOrder,
    postOrder,
    setDoneOrder,
} as const;
