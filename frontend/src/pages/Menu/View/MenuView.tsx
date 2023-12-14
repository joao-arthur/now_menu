import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { UserPageFooter } from "../../../Components/UserPageFooter/UserPageFooter";
import { AnonimousPageFooter } from "../../../Components/AnonimousPageFooter/AnonimousPageFooter";
import { menuInfoActions } from "../../../Domains/menuInfo";
import {
    FlexContainer,
    FlexContent,
    Link,
    Title,
} from "../../../Components/Layout";
import { SearchBar } from "./SearchBar";
import { Container, Content, Edit } from "./MenuView.styles";
import { MostOrdered } from "./MostOrdered/MostOrdered";
import { CategoryList } from "./CategoryList/CategoryList";
import { MenuItemList } from "./MenuItemList/MenuItemList";
import {
    useGetTableMenu,
    useGetUserMenu,
} from "../../../Api/item.api";

export function MenuView() {
    const dispatch = useAppDispatch();
    const { tableId } = useParams<{ tableId: string }>();
    const loaded = useAppSelector(({ menuInfo }) => menuInfo.loaded);
    const restaurant = useAppSelector(({ menuInfo }) =>
        menuInfo.restaurant
    );
    const logged = useAppSelector(({ user }) => user.logged);
    const { data, mutate } = tableId
        ? useGetTableMenu(tableId)
        : useGetUserMenu();

    useEffect(() => {
        if (!loaded) mutate();
    }, [loaded]);

    useEffect(() => {
        if (data) {
            dispatch(
                menuInfoActions.loadMenu({
                    mostOrdered: ["erhfiuefh", "erfheu", "erfugeyu"],
                    restaurant: data.restaurant,
                    categories: Array.from(
                        new Set(
                            data.items.map(({ category }) =>
                                category
                            ),
                        ),
                    ).map((category) => ({
                        name: category,
                        items: data.items.filter(
                            (item) => item.category === category,
                        ),
                    })),
                }),
            );
        }
    }, [dispatch, data]);

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
