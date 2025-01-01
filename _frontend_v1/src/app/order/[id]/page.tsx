"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useGetOrder, useOrderDone } from "@/lib/order/orderAPI";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Subtitle,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { SecondaryButton } from "@/components/Layout";

 const Content = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid var(--borderGray);
    font-size: 0.9rem;
`;

 const Client = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

 const OrderItem = styled.div`
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

 const Print = styled.div`
    padding-top: 15px;
    text-align: center;
    font-size: 0.9rem;
    cursor: pointer;
`;

 const StatusButton = styled(SecondaryButton)`
    cursor: default;
`;

 const ItemContainer = styled.div`
    margin: 12px 0;
`;

 const ItemName = styled.p`
    margin: 0;
    font-size: 1.1rem;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
`;

 const ItemObservation = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;

 const Total = styled.span`
    font-size: 1.2rem;
`;

export default function OrderIdPage() {
    const router = useRouter();
    const id = router?.params?.id;

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

    const now = new Date();

    if (isSuccess) {
        router.push("/");
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
                    {order.active
                        ? "Pedido em andamento"
                        : "Pedido já entregue"}
                </StatusButton>
                <Content>
                    <Client>
                        <span>Cliente: {order.customer}</span>
                        <span>{order.tableName}</span>
                    </Client>
                </Content>
                <Content>
                    {order.items.map(
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
                                order.items.reduce(
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
