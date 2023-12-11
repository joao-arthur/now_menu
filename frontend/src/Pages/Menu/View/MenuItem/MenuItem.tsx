import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';
import { PrimaryText } from '../../../../Components/Layout';
import { item } from '../../../../Domains/menuInfo';
import { Link } from '../../../../Components/Layout';
import {
    Container,
    Image,
    Content,
    Description,
    Footer,
    Time,
    Price
} from './MenuItem.styles';
import { useGetMockedImage } from '../../../../Api/image.api';

type props = {
    item: item;
};

export function MenuItem({
    item: { description, name, prepareTime, price, id }
}: props) {
    const { tableId } = useParams<{ tableId: string }>();
    const selectedIds = useAppSelector(({ orderRegister }) =>
        orderRegister.map(({ id }) => id)
    );
    const selected = selectedIds.includes(id);
    const logged = useAppSelector(({ user }) => user.logged);
    const [imageURL, setImageURL] = useState('');
    const { data, mutate } = useGetMockedImage();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data?.image) setImageURL(data.image);
    }, [data]);

    function Component() {
        return (
            <Container>
                <Image src={imageURL} disabled={!!selected} />
                <Content>
                    <span>{name}</span>
                    <Description>{description}</Description>
                    <Footer>
                        <Time>⏲️ {(prepareTime / 60).toFixed(2)} min</Time>
                        {selected ? (
                            <Price>
                                {(price / 100).toLocaleString(undefined, {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </Price>
                        ) : (
                            <PrimaryText>
                                <Price>
                                    {(price / 100).toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </Price>
                            </PrimaryText>
                        )}
                    </Footer>
                </Content>
            </Container>
        );
    }

    return (
        <>
            {logged || selected ? (
                <Component />
            ) : (
                <Link to={`/table/${tableId}/item/${id}`}>
                    <Component />
                </Link>
            )}
        </>
    );
}
