import styled from "styled-components";
import { useMenuInfoStore } from "@/lib/menu/useMenuInfoStore";
import { MostOrderedItem } from "./MostOrderedItem";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    font-size: 0.9rem;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    display: flex;
    overflow-x: auto;
    padding-bottom: 10px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    :-webkit-scrollbar {
        display: none;
    }
`;

export const List = styled.div`
    display: flex;
`;

export const Item = styled.img`
    height: 140px;
    width: 120px;
    margin: 0 10px;
    border-radius: 7px;
    object-fit: cover;
`;

export function MostOrdered() {
    const { menuInfo } = useMenuInfoStore();

    return (
        <Container>
            <Title>Mais pedidos</Title>
            <Content>
                <List>
                    {menuInfo.mostOrdered.map((mostOrdered) => (
                        <MostOrderedItem key={mostOrdered} />
                    ))}
                </List>
            </Content>
        </Container>
    );
}
