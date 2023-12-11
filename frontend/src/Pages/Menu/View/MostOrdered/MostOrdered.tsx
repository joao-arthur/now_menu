import { useAppSelector } from '../../../../hooks';
import { Container, Title, Content, List } from './MostOrdered.styles';
import { MostOrderedItem } from './MostOrderedItem';

export function MostOrdered() {
    const mostOrdered = useAppSelector(({ menuInfo }) => menuInfo.mostOrdered);

    return (
        <Container>
            <Title>Mais pedidos</Title>
            <Content>
                <List>
                    {mostOrdered.map(mostOrdered => (
                        <MostOrderedItem key={mostOrdered} />
                    ))}
                </List>
            </Content>
        </Container>
    );
}
