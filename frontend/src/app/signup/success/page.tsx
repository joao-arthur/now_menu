import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { Image } from "@/components/Image/Image";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    ButtonLink,
    FlexContainer,
    FlexContent,
    Subtitle,
    Title,
} from "@/components/Layout";
import { useSignUpStore } from "@/domains/signUp";
import { useSessionStore } from "@/domains/session";

export function SignUpSuccess() {
    const { setLogged } = useSessionStore();
    const {
        success,
        clear,
    } = useSignUpStore();

    useEffect(() => {
        if (!success) return;
        setLogged(true);
        clear();
    }, []);

    if (!success) {
        redirect("/signin");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cadastro completo!</Title>
                <Subtitle>
                    Parabéns! seu cadastro está finalizado, agora você
                    precisa cadastrar o seu cardápio
                </Subtitle>
                <Image
                    name="signupSuccess"
                    width={300}
                    height={300}
                />
                <ButtonLink to="/menu/register">
                    Cadastrar cardápio
                </ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
