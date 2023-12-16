import { useEffect, useState } from "react";
import styled from "styled-components";
import type { MenuItem } from "@/domains/menuInfo";
import { useOrderRegisterStore } from "@/domains/orderRegister";
import { useSessionStore } from "@/domains/session";
import { PrimaryText } from "@/components/Layout";
import { Link } from "@/components/Layout";
import { useGetMockedImage } from "@/api/image.api";

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
    readonly tableId: string;
};

export function MenuItem({ item, tableId }: Props) {
    const { items } = useOrderRegisterStore();
    const { session } = useSessionStore();
    const { data, mutate } = useGetMockedImage();
    const selected = items.map(({ id }) => id).includes(item.id);
    const [imageURL, setImageURL] = useState("");

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
                    <span>{item.name}</span>
                    <Description>{item.description}</Description>
                    <Footer>
                        <Time>
                            ⏲️ {(item.prepareTime / 60).toFixed(2)} min
                        </Time>
                        {selected
                            ? (
                                <Price>
                                    {(item.price / 100)
                                        .toLocaleString(
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
                                        {(item.price / 100)
                                            .toLocaleString(
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
            {session.logged || selected
                ? <Component />
                : (
                    <Link href={`/table/${tableId}/item/${item.id}`}>
                        <Component />
                    </Link>
                )}
        </>
    );
}
