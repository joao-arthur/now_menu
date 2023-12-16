"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useMenuInfoStore } from "@/lib/menu/useMenuInfoStore";
import { useSessionStore } from "@/lib/session/useSessionStore";
import { useGetTableMenu, useGetUserMenu } from "@/lib/item/itemAPI";
import {
    FlexContainer,
    FlexContent,
    Link,
    Title,
} from "@/components/Layout";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { AnonimousPageFooter } from "@/components/AnonimousPageFooter/AnonimousPageFooter";
import { SearchBar } from "@/features/Menu/View/SearchBar";
import { MostOrdered } from "@/features/Menu/View/MostOrdered";
import { CategoryList } from "@/features/Menu/View/CategoryList";
import { MenuItemList } from "@/features/Menu/View/MenuItemList";

 const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
`;

 const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

 const Edit = styled.span`
    font-size: 0.8rem;
`;

export default function TableIdPage() {
    const router = useRouter();
    const tableId = router?.params?.table;
    const itemId = router?.params?.item;

    const { session } = useSessionStore();
    const { loaded, menuInfo, setMenu } = useMenuInfoStore();

    const restaurant = menuInfo.restaurant;
    const logged = session.logged;
    const { data, mutate } = tableId
        ? useGetTableMenu(tableId)
        : useGetUserMenu();

    useEffect(() => {
        if (!loaded) mutate();
    }, [loaded]);

    useEffect(() => {
        if (data) {
            setMenu({
                mostOrdered: ["erhfiuefh", "erfheu", "erfugeyu"],
                restaurant: data.restaurant,
                categories: Array.from(
                    new Set(
                        data.items.map(({ category }) => category),
                    ),
                ).map((category) => ({
                    name: category,
                    items: data.items.filter(
                        (item) => item.category === category,
                    ),
                })),
            });
        }
    }, [data]);

    return (
        <FlexContainer>
            <FlexContent>
                <Container>
                    {logged
                        ? (
                            <>
                                <Title>Meu cardápio</Title>
                                <Link href="/menu/edit">
                                    <Edit>editar</Edit>
                                </Link>
                            </>
                        )
                        : <Title>{restaurant.name}</Title>}
                </Container>
                <Content>
                    <SearchBar />
                    <MostOrdered />
                    <CategoryList />
                    <MenuItemList tableId={tableId} />
                </Content>
            </FlexContent>
            {logged
                ? <UserPageFooter current="menu" />
                : (
                    <AnonimousPageFooter
                        selected={false}
                        tableId={tableId}
                    />
                )}
        </FlexContainer>
    );
}
