import {
    ButtonLink,
    FlexContainer,
    FlexContent,
    Subtitle,
    Title,
} from "../../../../components/Layout";
import { Image } from "../../../../components/Image/Image";
import { PageHeader } from "../../../../components/PageHeader/PageHeader";

export function MenuRegisterSuccess() {
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cardápio criado!</Title>
                <Subtitle>
                    Parabéns! seu cardápio está pronto, agora só gerar
                    os QR codes e começar a vender
                </Subtitle>
                <Image name="menuSuccess" />
                <ButtonLink to="/tables/register">
                    Cadastrar mesas
                </ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
