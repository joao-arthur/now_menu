import { useEffect } from "react";
import styled from "styled-components";
import { useMenuInfoStore } from "@/domains/menuInfo";
import { useSessionStore } from "@/domains/session";
import { useGetUserMenu } from "@/api/item.api";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { AnonimousPageFooter } from "@/components/AnonimousPageFooter/AnonimousPageFooter";
import {
    FlexContainer,
    FlexContent,
    Link,
    Title,
} from "@/components/Layout";
import { SearchBar } from "@/features/Menu/View/SearchBar";
import { MostOrdered } from "@/features/Menu/View/MostOrdered";
import { CategoryList } from "@/features/Menu/View/CategoryList";
import { MenuItemList } from "@/features/Menu/View/MenuItemList";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

export const Edit = styled.span`
    font-size: 0.8rem;
`;

export default function MenuPage() {
    const { setMenu, menuInfo, loaded } = useMenuInfoStore();
    const { session } = useSessionStore();
    const { data, mutate } = useGetUserMenu();

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
    }, [setMenu, data]);

    return (
        <FlexContainer>
            <FlexContent>
                <Container>
                    {session.logged
                        ? (
                            <>
                                <Title>Meu cardápio</Title>
                                <Link href="/menu/edit">
                                    <Edit>editar</Edit>
                                </Link>
                            </>
                        )
                        : <Title>{menuInfo.restaurant.name}</Title>}
                </Container>
                <Content>
                    <SearchBar />
                    <MostOrdered />
                    <CategoryList />
                    <MenuItemList tableId="undefined" />
                </Content>
            </FlexContent>
            {session.logged
                ? <UserPageFooter current="menu" />
                : (
                    <AnonimousPageFooter
                        selected={false}
                        tableId="undefined"
                    />
                )}
        </FlexContainer>
    );
}
