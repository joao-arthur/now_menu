"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/lib/session/useSignUpStore";
import { useSignUp } from "@/lib/user/userAPI";
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
import { Form } from "@/components/Form/Form";

export default function SignUpAccountPage() {
    const router = useRouter();
    const [acceptedTerms, setAcceptedTerm] = useState(false);
    const {
        values,
        success,
        setEmail,
        setPassword,
        setPasswordMatch,
        setSuccess,
    } = useSignUpStore();

    const validForm = values.email &&
        values.password &&
        values.passwordMatch &&
        values.password === values.passwordMatch &&
        acceptedTerms;

    const { isSuccess, isPending, data, mutate } = useSignUp({
        cnpj: values.cnpj,
        name: values.name,
        telephone: values.telephone,
        cep: values.cep,
        address: values.address,
        district: values.district,
        city: values.city,
        state: values.state,
        email: values.email,
        password: values.password,
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
        setSuccess(true);
    }

    if (success) {
        router.push("/signup/success");
    }

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
                        value={values.email}
                        onChange={(newValue) => setEmail(newValue)}
                        disabled={isPending}
                    />
                    <Field
                        title="Senha"
                        name="password"
                        type="password"
                        required
                        value={values.password}
                        onChange={(newValue) => setPassword(newValue)}
                        disabled={isPending}
                    />
                    <Field
                        title="Digite a senha novamente"
                        name="passwordMatch"
                        type="password"
                        required
                        value={values.passwordMatch}
                        onChange={(newValue) =>
                            setPasswordMatch(newValue)}
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
                    <Link href="/signin">
                        Já possui uma conta?{" "}
                        <PrimaryText>Entrar!</PrimaryText>
                    </Link>
                </SecondaryAction>
            </FlexContent>
        </FlexContainer>
    );
}
