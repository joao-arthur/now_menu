"use client";

import { useEffect } from "react";
import { useOrdersStore } from "@/domains/orders";
import { useGetOrders } from "@/api/order.api";
import {
    AloneTitle,
    FlexContainer,
    FlexContent,
    Padding,
    Text,
} from "@/components/Layout";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { OrderItem } from "@/features/OrdersList/OrderItem";

export default function OrdersPage() {
    const { orders, setOrders } = useOrdersStore();
    const { mutate, data } = useGetOrders();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data) setOrders(data);
    }, [data]);

    return (
        <FlexContainer>
            <FlexContent>
                <AloneTitle>Pedidos</AloneTitle>
                <Text>
                    {new Date().toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Text>
                {orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))}
                <Padding />
            </FlexContent>
            <UserPageFooter current="orders" />
        </FlexContainer>
    );
}
