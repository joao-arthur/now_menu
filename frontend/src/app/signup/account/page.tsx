import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Field } from "@/components/Field/Field";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Link,
    PrimaryText,
    SecondaryAction,
    Subtitle,
    Title,
} from "@/components/Layout";
import { signUpActions } from "@/domains/signUp";
import { Form } from "@/components/Form/Form";
import { useSignUp } from "@/api/user.api";

export function SignUpAccount() {
    const dispatch = useAppDispatch();
    const [acceptedTerms, setAcceptedTerm] = useState(false);
    const {
        cnpj,
        name,
        telephone,
        cep,
        address,
        district,
        city,
        state,
        email,
        password,
        passwordMatch,
        success,
    } = useAppSelector(({ signUp }) => signUp);

    const validForm = email &&
        password &&
        passwordMatch &&
        password === passwordMatch &&
        acceptedTerms;

    const { isSuccess, isPending, data, mutate } = useSignUp({
        cnpj,
        name,
        telephone,
        cep,
        address,
        district,
        city,
        state,
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
        dispatch(signUpActions.setSuccess(true));
    }

    if (success) return redirect("/signup/success");
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/signup/address" />
                <Title>Informações de login</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title="E-mail"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setEmail(newValue),
                            )}
                        disabled={isPending}
                    />
                    <Field
                        title="Senha"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setPassword(newValue),
                            )}
                        disabled={isPending}
                    />
                    <Field
                        title="Digite a senha novamente"
                        name="passwordMatch"
                        type="password"
                        required
                        value={passwordMatch}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setPasswordMatch(
                                    newValue,
                                ),
                            )}
                        disabled={isPending}
                    />
                    <Checkbox
                        value={acceptedTerms}
                        onChange={setAcceptedTerm}
                        disabled={isPending}
                    >
                        Li e aceito os{" "}
                        <PrimaryText>
                            termos de privacidade
                        </PrimaryText>{" "}
                        e <PrimaryText>termos de uso</PrimaryText>
                    </Checkbox>
                    <Button disabled={!validForm || isPending}>
                        Cadastrar
                    </Button>
                </Form>
                <SecondaryAction>
                    <Link to="/signin">
                        Já possui uma conta?{" "}
                        <PrimaryText>Entrar!</PrimaryText>
                    </Link>
                </SecondaryAction>
            </FlexContent>
        </FlexContainer>
    );
}
