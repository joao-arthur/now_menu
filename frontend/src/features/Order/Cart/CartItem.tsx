import { useAppDispatch } from "../../../../hooks";
import { PrimaryText } from "../../../../components/Layout";
import { orderRegisterActions } from "../../../../Domains/orderRegister";
import { item } from "../../../../Domains/menuInfo";
import { Amount } from "../Amount/Amount";
import { useGetMockedImage } from "../../../../api/image.api";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    margin: 5px 0;
    gap: 0 10px;
    width: 100%;
`;

export const Image = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 7px;
    flex: 0 0 auto;
    object-fit: cover;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 auto;
    min-width: 30px;
`;

export const Title = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Price = styled.span`
    font-size: 0.7rem;

    display: block;
`;


type Props = {
    readonly item: item & {
        readonly amount: number;
    };
};

export function CartItem(
    { item: { id, name, price, amount } }: Props,
) {
    const [imageURL, setImageURL] = useState("");
    const dispatch = useAppDispatch();
    const { data, mutate } = useGetMockedImage();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data?.image) setImageURL(data.image);
    }, [data]);
    return (
        <Container>
            <Image src={imageURL} />
            <Content>
                <Title>{name}</Title>
                <PrimaryText>
                    <Price>
                        {(price / 100).toLocaleString(undefined, {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Price>
                </PrimaryText>
            </Content>
            <Amount
                value={amount}
                onChange={(newAmount) => {
                    dispatch(
                        orderRegisterActions.setAmount({
                            id,
                            amount: newAmount,
                        }),
                    );
                }}
            />
        </Container>
    );
}
