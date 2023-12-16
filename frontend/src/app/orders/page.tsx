import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    AloneTitle,
    FlexContainer,
    FlexContent,
    Padding,
    Text,
} from "@/components/Layout";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { ordersActions } from "@/domains/orders";
import { useGetOrders } from "@/api/order.api";
import { OrderItem } from "./OrderItem/OrderItem";

export function OrdersList() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(({ orders }) => orders);
    const { mutate, data } = useGetOrders();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data) dispatch(ordersActions.setOrders(data));
    }, [dispatch, data]);

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
