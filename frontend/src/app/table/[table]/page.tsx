import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserPageFooter } from "@/components/UserPageFooter/UserPageFooter";
import { AnonimousPageFooter } from "@/components/AnonimousPageFooter/AnonimousPageFooter";
import { useMenuInfoStore } from "@/domains/menuInfo";
import {
    FlexContainer,
    FlexContent,
    Link,
    Title,
} from "@/components/Layout";
import { SearchBar } from "./SearchBar";
import { MostOrdered } from "./MostOrdered/MostOrdered";
import { CategoryList } from "./CategoryList/CategoryList";
import { MenuItemList } from "./MenuItemList/MenuItemList";
import { useGetTableMenu, useGetUserMenu } from "@/api/item.api";
import styled from "styled-components";
import { useSessionStore } from "@/domains/session";

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

export function MenuView() {
    const { session } = useSessionStore();
    const { loaded, menuInfo, setMenu } = useMenuInfoStore();

    const { tableId } = useParams<{ tableId: string }>();
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
                                <Link to="/menu/edit">
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
                    <MenuItemList />
                </Content>
            </FlexContent>
            {logged
                ? <UserPageFooter current="menu" />
                : <AnonimousPageFooter selected={false} />}
        </FlexContainer>
    );
}
