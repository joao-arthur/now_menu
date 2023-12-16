import { useParams } from "react-router-dom";
import { Image } from "../../../components/Image/Image";
import {
    FlexContainer,
    FlexContent,
    Link,
    Subtitle,
    Title,
} from "../../../components/Layout";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { OrderAgain } from "./OrderSuccess.styles";
import styled from "styled-components";
import { PrimaryText } from "../../../components/Layout";

export const OrderAgain = styled(PrimaryText)`
    text-align: center;
    font-size: 0.8rem;
    font-weight: normal;
`;

export function OrderSuccess() {
    const { tableId } = useParams<{ tableId: string }>();

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader />
                <Title>Pedido realizado!</Title>
                <Subtitle>
                    Parabéns! seu pedido já está sendo praparado.
                    Agora só esperar.
                </Subtitle>
                <Image name="orderSuccess" />
                <OrderAgain>
                    <Link to={`/table/${tableId}`}>
                        Pedir novamente
                    </Link>
                </OrderAgain>
            </FlexContent>
        </FlexContainer>
    );
}
