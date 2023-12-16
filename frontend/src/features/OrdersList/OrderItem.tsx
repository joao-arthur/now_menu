import { Link, PrimaryText } from "../../../components/Layout";
import { order } from "../../../Domains/orders";
import styled from "styled-components";

export const Container = styled.div`
    background-color: var(--backgroundGray);
    border-radius: 7px;
    margin-top: 8px;
`;

export const Body = styled.div`
    font-size: 0.9rem;
    padding: 10px 20px;
    border-bottom: 1px solid var(--borderGray);
    display: flex;
    justify-content: space-between;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
    padding: 18px 0;
`;

export const ItemContainer = styled.div`
    margin: 12px 0;
`;

export const ItemName = styled.p`
    margin: 0;
    font-size: 1.1rem;
`;

export const ItemObservation = styled.p`
    margin: 0;
    font-size: 0.9rem;
`;


type Props = {
    readonly order: order;
};

export function OrderItem({
    order: { id, createdAt, customer, tableName, items },
}: Props) {
    return (
        <Container>
            <Body>
                <div>Pedido</div>
                <div>{new Date(createdAt).toLocaleTimeString()}</div>
            </Body>
            <Body>
                <div>{customer}</div>
                <div>{tableName}</div>
            </Body>
            <Body>
                <div>
                    {items.map((
                        { itemId, amount, itemName, observation },
                    ) => (
                        <ItemContainer key={itemId}>
                            <ItemName>
                                {amount}x {itemName}
                            </ItemName>
                            {observation
                                ? (
                                    <ItemObservation>
                                        Observação: {observation}
                                    </ItemObservation>
                                )
                                : null}
                        </ItemContainer>
                    ))}
                </div>
            </Body>
            <Footer>
                <Link to={`order/${id}`}>
                    <PrimaryText>Visualizar</PrimaryText>
                </Link>
            </Footer>
        </Container>
    );
}
