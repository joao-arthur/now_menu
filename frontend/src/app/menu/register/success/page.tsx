"use client";

import {
    ButtonLink,
    FlexContainer,
    FlexContent,
    Subtitle,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { MenuSuccessImg } from "@/components/Image/MenuSuccessImg";

export default function MenuRegisterSuccessPage() {
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cardápio criado!</Title>
                <Subtitle>
                    Parabéns! seu cardápio está pronto, agora só gerar
                    os QR codes e começar a vender
                </Subtitle>
                <MenuSuccessImg />
                <ButtonLink href="/tables/register">
                    Cadastrar mesas
                </ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
