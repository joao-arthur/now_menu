"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/lib/session/useSignUpStore";
import { useSessionStore } from "@/lib/session/useSessionStore";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    ButtonLink,
    FlexContainer,
    FlexContent,
    Subtitle,
    Title,
} from "@/components/Layout";
import { SignUpSuccessImg } from "@/components/Image/SignUpSuccessImg";

export default function SignUpSuccessPage() {
    const router = useRouter();
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
        router.push("/signin");
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
                <SignUpSuccessImg />
                <ButtonLink href="/menu/register">
                    Cadastrar cardápio
                </ButtonLink>
            </FlexContent>
        </FlexContainer>
    );
}
