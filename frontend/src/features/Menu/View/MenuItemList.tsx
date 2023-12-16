import styled from "styled-components";
import { useMenuInfoStore } from "@/domains/menuInfo";
import { MenuItem } from "./MenuItem";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
`;

type Props = {
    readonly tableId: string;
}

export function MenuItemList({tableId}:Props) {
    const { menuInfo, search, selectedCategory } = useMenuInfoStore();

    if (!menuInfo.categories.length) return <Container />;
    const currentCategory = menuInfo.categories.find(
        (category) => category.name === selectedCategory,
    );
    if (!currentCategory) return <Container />;

    return (
        <Container>
            {currentCategory.items
                .filter(
                    (item) =>
                        search.length < 2 ||
                        item.name
                            .toLocaleLowerCase()
                            .trim()
                            .includes(
                                search.toLocaleLowerCase().trim(),
                            ),
                )
                .map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        tableId={tableId}
                    />
                ))}
        </Container>
    );
}
