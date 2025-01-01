"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
    FlexContainer,
    FlexContent,
    Link,
    Subtitle,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { PrimaryText } from "@/components/Layout";
import { OrderSuccessImg } from "@/components/Image/OrderSuccessImg";

export const OrderAgain = styled(PrimaryText)`
    text-align: center;
    font-size: 0.8rem;
    font-weight: normal;
`;

export default function TableIdSuccessPage() {
    const router = useRouter();
    const tableId = router?.params?.table;

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader />
                <Title>Pedido realizado!</Title>
                <Subtitle>
                    Parabéns! seu pedido já está sendo praparado.
                    Agora só esperar.
                </Subtitle>
                <OrderSuccessImg />
                <OrderAgain>
                    <Link href={`/table/${tableId}`}>
                        Pedir novamente
                    </Link>
                </OrderAgain>
            </FlexContent>
        </FlexContainer>
    );
}
