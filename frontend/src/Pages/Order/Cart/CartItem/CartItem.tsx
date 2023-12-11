import { useAppDispatch } from '../../../../hooks';
import { PrimaryText } from '../../../../Components/Layout';
import { orderRegisterActions } from '../../../../Domains/orderRegister';
import { item } from '../../../../Domains/menuInfo';
import { Amount } from '../Amount/Amount';
import { Container, Image, Content, Title, Price } from './CartItem.styles';
import { useGetMockedImage } from '../../../../Api/image.api';
import { useEffect, useState } from 'react';

type props = {
    item: item & {
        amount: number;
    };
};

export function CartItem({ item: { id, name, price, amount } }: props) {
    const [imageURL, setImageURL] = useState('');
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
                            style: 'currency',
                            currency: 'BRL'
                        })}
                    </Price>
                </PrimaryText>
            </Content>
            <Amount
                value={amount}
                onChange={newAmount => {
                    dispatch(
                        orderRegisterActions.setAmount({
                            id,
                            amount: newAmount
                        })
                    );
                }}
            />
        </Container>
    );
}
