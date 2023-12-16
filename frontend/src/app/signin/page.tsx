import { useState } from "react";
import { useSignUpStore } from "@/domains/signUp";
import { useSessionStore } from "@/domains/session";
import { Field } from "@/components/Field/Field";
import { Form } from "@/components/Form/Form";
import { Image } from "@/components/Image/Image";
import {
    Button,
    FlexContainer,
    FlexContent,
    InputLink,
    Link,
    LogoContainer,
    PrimaryText,
    SecondaryAction,
    Subtitle,
    Title,
} from "@/components/Layout";
import { useSignIn } from "@/features/SignIn/useSignIn";

export default function SignInPage() {
    const { setLogged } = useSessionStore();
    const { clear } = useSignUpStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const validForm = email && password;

    const { isSuccess, isPending, data, mutate } = useSignIn({
        email,
        password,
    });

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (isSuccess) {
        window.localStorage.setItem(
            "@NOW_MENU/user/token",
            JSON.stringify(data),
        );
        setLogged(true);
        clear();
    }

    return (
        <FlexContainer>
            <FlexContent>
                <LogoContainer>
                    <Image name="logo" height={240} width={230} />
                </LogoContainer>
                <Title>Entrar</Title>
                <Subtitle>Por favor entre para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title="E-mail"
                        name="login"
                        type="text"
                        required
                        value={email}
                        onChange={setEmail}
                        disabled={isPending}
                    />
                    <Field
                        title="Senha"
                        name="password"
                        type="password"
                        required
                        observation={
                            <InputLink href="#">
                                Esqueceu a senha?
                            </InputLink>
                        }
                        value={password}
                        onChange={setPassword}
                        disabled={isPending}
                    />

                    <Button disabled={!validForm || isPending}>
                        Entrar
                    </Button>
                </Form>
                <SecondaryAction>
                    <Link href="/signup">
                        Novo por aqui?{" "}
                        <PrimaryText>Cadastre-se!</PrimaryText>
                    </Link>
                </SecondaryAction>
            </FlexContent>
        </FlexContainer>
    );
}
