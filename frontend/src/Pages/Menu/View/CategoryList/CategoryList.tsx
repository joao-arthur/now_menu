import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { PrimaryText } from "../../../../Components/Layout";
import { menuInfoActions } from "../../../../Domains/menuInfo";
import {
    Container,
    Content,
    Item,
    SelectedItem,
} from "./CategoryList.styles";

export function CategoryList() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(({ menuInfo }) =>
        menuInfo.categories
    );
    const selectedCategory = useAppSelector(
        ({ menuInfo }) => menuInfo.selectedCategory,
    );

    function clickItem(categoryName: string) {
        dispatch(menuInfoActions.setSelectedCategory(categoryName));
    }

    if (!categories.length) return <Container />;

    return (
        <Container>
            <Content>
                {categories.map((category) =>
                    selectedCategory === category.name
                        ? (
                            <SelectedItem key={category.name}>
                                <PrimaryText>
                                    {category.name}
                                </PrimaryText>
                            </SelectedItem>
                        )
                        : (
                            <Item
                                key={category.name}
                                onClick={() =>
                                    clickItem(category.name)}
                            >
                                {category.name}
                            </Item>
                        )
                )}
            </Content>
        </Container>
    );
}
