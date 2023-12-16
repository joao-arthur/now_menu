import { redirect, useParams } from "react-router-dom";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Subtitle,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useGetOrder, useOrderDone } from "@/api/order.api";
import styled from "styled-components";
import { SecondaryButton } from "@/components/Layout";

export const Content = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid var(--borderGray);
    font-size: 0.9rem;
`;

export const Client = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

export const OrderItem = styled.div`
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

export const Print = styled.div`
    padding-top: 15px;
    text-align: center;
    font-size: 0.9rem;
    cursor: pointer;
`;

export const StatusButton = styled(SecondaryButton)`
    cursor: default;
`;

export const ItemContainer = styled.div`
    margin: 12px 0;
`;

export const ItemName = styled.p`
    margin: 0;
    font-size: 1.1rem;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

export const ItemObservation = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;

export const Total = styled.span`
    font-size: 1.2rem;
`;

export function OrderView() {
    const id = useParams<{ id: string }>().id;
    const { data: order, isPending: isPendingGet } = useGetOrder(id);
    const { isSuccess, isPending: isPendingPatch, mutate } =
        useOrderDone(id);

    if (!order) {
        return (
            <FlexContainer>
                <FlexContent>
                    <PageHeader goBackLink="/" />
                    <Title>
                        {isPendingGet
                            ? "Carregando pedido"
                            : "Pedido não encontrado!"}
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
    }

    const { customer, items, tableName, active } = order;
    const now = new Date();

    if (isSuccess) {
        redirect("/");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/" />
                <Title>Pedido</Title>
                <Subtitle>
                    Realizado às {now.toLocaleTimeString()} -{" "}
                    {now.toLocaleDateString()}
                </Subtitle>
                <StatusButton>
                    {active
                        ? "Pedido em andamento"
                        : "Pedido já entregue"}
                </StatusButton>
                <Content>
                    <Client>
                        <span>Cliente: {customer}</span>
                        <span>{tableName}</span>
                    </Client>
                </Content>
                <Content>
                    {items.map(
                        (
                            {
                                itemId,
                                amount,
                                itemName,
                                observation,
                                price,
                            },
                        ) => (
                            <ItemContainer key={itemId}>
                                <ItemName>
                                    {amount}x {itemName}
                                    <span>
                                        {(
                                            (price * amount) /
                                            100
                                        ).toLocaleString(undefined, {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </span>
                                </ItemName>
                                {observation
                                    ? (
                                        <ItemObservation>
                                            {observation}
                                        </ItemObservation>
                                    )
                                    : null}
                            </ItemContainer>
                        ),
                    )}
                    <OrderItem>
                        <Total>Total</Total>
                        <Total>
                            {(
                                items.reduce(
                                    (sum, { price, amount }) =>
                                        sum + price * amount,
                                    0,
                                ) / 100
                            ).toLocaleString(undefined, {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Total>
                    </OrderItem>
                </Content>
                <Button
                    onClick={() => mutate()}
                    disabled={isPendingPatch}
                >
                    Marcar como entregue
                </Button>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
