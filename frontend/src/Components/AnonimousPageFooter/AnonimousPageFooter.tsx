import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Link } from '../Layout';
import { Container, Icon } from './AnonimousPageFooter.styles';

type props = {
    selected: boolean;
};

export function AnonimousPageFooter({ selected }: props) {
    const { tableId } = useParams<{ tableId: string }>();
    const hasItems = !!useAppSelector(
        ({ orderRegister }) => orderRegister.length
    );

    return (
        <Container>
            <Link to={`/table/${tableId}/cart`}>
                <Icon
                    selected={selected}
                    name='MdShoppingBasket'
                    hasColor={hasItems}
                />
            </Link>
        </Container>
    );
}
