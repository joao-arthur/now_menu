import { useParams, Redirect } from 'react-router-dom';
import {
    Title,
    Subtitle,
    Button,
    FlexContainer,
    FlexContent,
    Padding
} from '../../../Components/Layout';
import { PageHeader } from '../../../Components/PageHeader/PageHeader';
import {
    Content,
    OrderItem,
    Client,
    StatusButton,
    ItemContainer,
    ItemName,
    ItemObservation,
    Total
} from './OrderView.styles';
import { useGetOrder, useOrderDone } from '../../../Api/order.api';

export function OrderView() {
    const id = useParams<{ id: string }>().id;
    const { data: order, isLoading: isLoadingGet } = useGetOrder(id);
    const { isSuccess, isLoading: isLoadingPatch, mutate } = useOrderDone(id);

    if (!order)
        return (
            <FlexContainer>
                <FlexContent>
                    <PageHeader goBackLink='/' />
                    <Title>
                        {isLoadingGet
                            ? 'Carregando pedido'
                            : 'Pedido não encontrado!'}
                    </Title>
                    <Content>
                        <Client>
                            <span>Cliente: --------</span>
                            <span>Mesa --</span>
                        </Client>
                        <div>Observação: --------</div>
                    </Content>
                    <Content>
                        <div>
                            <OrderItem>
                                <span>-----------</span>
                                <span>R$--.--</span>
                            </OrderItem>
                            <OrderItem>
                                <span>-----------</span>
                                <span>R$--.--</span>
                            </OrderItem>
                            <OrderItem>
                                <span>-----------</span>
                                <span>R$--.--</span>
                            </OrderItem>
                        </div>
                    </Content>
                </FlexContent>
            </FlexContainer>
        );

    const { customer, items, tableName, active } = order;
    const now = new Date();

    if (isSuccess) return <Redirect to='/' />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink='/' />
                <Title>Pedido</Title>
                <Subtitle>
                    Realizado às {now.toLocaleTimeString()} -{' '}
                    {now.toLocaleDateString()}
                </Subtitle>
                <StatusButton>
                    {active ? 'Pedido em andamento' : 'Pedido já entregue'}
                </StatusButton>
                <Content>
                    <Client>
                        <span>Cliente: {customer}</span>
                        <span>{tableName}</span>
                    </Client>
                </Content>
                <Content>
                    {items.map(
                        ({ itemId, amount, itemName, observation, price }) => (
                            <ItemContainer key={itemId}>
                                <ItemName>
                                    {amount}x {itemName}
                                    <span>
                                        {(
                                            (price * amount) /
                                            100
                                        ).toLocaleString(undefined, {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })}
                                    </span>
                                </ItemName>
                                {observation ? (
                                    <ItemObservation>
                                        {observation}
                                    </ItemObservation>
                                ) : null}
                            </ItemContainer>
                        )
                    )}
                    <OrderItem>
                        <Total>Total</Total>
                        <Total>
                            {(
                                items.reduce(
                                    (sum, { price, amount }) =>
                                        sum + price * amount,
                                    0
                                ) / 100
                            ).toLocaleString(undefined, {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </Total>
                    </OrderItem>
                </Content>
                <Button onClick={() => mutate()} disabled={isLoadingPatch}>
                    Marcar como entregue
                </Button>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
