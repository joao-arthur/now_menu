import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PrimaryText } from "@/components/Layout";
import type { MenuItem } from "@/domains/menuInfo";
import { Link } from "@/components/Layout";
import { useGetMockedImage } from "@/api/image.api";
import styled from "styled-components";
import { useOrderRegisterStore } from "@/domains/orderRegister";
import { useSessionStore } from "@/domains/session";

export const Container = styled.div`
    display: flex;
    margin: 5px 0;
    gap: 0 10px;
    width: 100%;
`;

type ImageProps = {
    readonly disabled: boolean;
};

export const Image = styled.img<ImageProps>`
    width: 70px;
    height: 70px;
    border-radius: 7px;
    ${({ disabled }) => (disabled ? "opacity: 0.4;" : "")}
    object-fit: cover;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Description = styled.span`
    font-size: 0.7rem;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
`;

export const Time = styled.span`
    font-size: 0.7rem;
`;

export const Price = styled.span`
    font-size: 0.7rem;

    display: block;
`;

type Props = {
    readonly item: MenuItem;
};

export function MenuItem({
    item: { description, name, prepareTime, price, id },
}: Props) {
    const { tableId } = useParams<{ tableId: string }>();

    const { items } = useOrderRegisterStore();

    const selectedIds = items.map(({ id }) => id);

    const { session } = useSessionStore();

    const selected = selectedIds.includes(id);
    const logged = session.logged;
    const [imageURL, setImageURL] = useState("");
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
                        <Time>
                            ⏲️ {(prepareTime / 60).toFixed(2)} min
                        </Time>
                        {selected
                            ? (
                                <Price>
                                    {(price / 100).toLocaleString(
                                        undefined,
                                        {
                                            style: "currency",
                                            currency: "BRL",
                                        },
                                    )}
                                </Price>
                            )
                            : (
                                <PrimaryText>
                                    <Price>
                                        {(price / 100).toLocaleString(
                                            undefined,
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            },
                                        )}
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
            {logged || selected
                ? <Component />
                : (
                    <Link to={`/table/${tableId}/item/${id}`}>
                        <Component />
                    </Link>
                )}
        </>
    );
}
