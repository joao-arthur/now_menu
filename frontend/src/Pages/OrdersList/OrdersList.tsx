import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
    Text,
    AloneTitle,
    FlexContainer,
    FlexContent,
    Padding
} from '../../Components/Layout';
import { UserPageFooter } from '../../Components/UserPageFooter/UserPageFooter';
import { ordersActions } from '../../Domains/orders';
import { useGetOrders } from '../../Api/order.api';
import { OrderItem } from './OrderItem/OrderItem';

export function OrdersList() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(({ orders }) => orders);
    const { mutate, data } = useGetOrders();

    useEffect(() => {
        mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </Text>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} />
                ))}
                <Padding />
            </FlexContent>
            <UserPageFooter current='orders' />
        </FlexContainer>
    );
}
