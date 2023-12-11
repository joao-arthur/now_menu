import { useParams } from 'react-router-dom';
import { Image } from '../../../Components/Image/Image';
import {
    Title,
    FlexContainer,
    FlexContent,
    Subtitle,
    Link
} from '../../../Components/Layout';
import { PageHeader } from '../../../Components/PageHeader/PageHeader';
import { OrderAgain } from './OrderSuccess.styles';

export function OrderSuccess() {
    const { tableId } = useParams<{ tableId: string }>();

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader />
                <Title>Pedido realizado!</Title>
                <Subtitle>
                    Parabéns! seu pedido já está sendo praparado. Agora só
                    esperar.
                </Subtitle>
                <Image name='orderSuccess' />
                <OrderAgain>
                    <Link to={`/table/${tableId}`}>Pedir novamente</Link>
                </OrderAgain>
            </FlexContent>
        </FlexContainer>
    );
}
