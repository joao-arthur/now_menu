import { Link, PrimaryText } from "../../../Components/Layout";
import { order } from "../../../Domains/orders";
import {
    Body,
    Container,
    Footer,
    ItemContainer,
    ItemName,
    ItemObservation,
} from "./OrderItem.styles";

type props = {
    order: order;
};

export function OrderItem({
    order: { id, createdAt, customer, tableName, items },
}: props) {
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
