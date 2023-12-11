import {
    Title,
    Subtitle,
    ButtonLink,
    FlexContainer,
    FlexContent
} from '../../../../Components/Layout';
import { Image } from '../../../../Components/Image/Image';
import { PageHeader } from '../../../../Components/PageHeader/PageHeader';

export function MenuRegisterSuccess() {
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cardápio criado!</Title>
                <Subtitle>
                    Parabéns! seu cardápio está pronto, agora só gerar os QR
                    codes e começar a vender
                </Subtitle>
                <Image name='menuSuccess' />
                <ButtonLink to='/tables/register'>Cadastrar mesas</ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
