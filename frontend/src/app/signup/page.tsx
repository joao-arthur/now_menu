"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/domains/signUp";
import { Field } from "@/components/Field/Field";
import { Form } from "@/components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Link,
    LogoContainer,
    PrimaryText,
    SecondaryAction,
    Subtitle,
    Title,
} from "@/components/Layout";
import { LogoImg } from "@/components/Image/LogoImg";

export default function SignUpPage() {
    const router = useRouter();
    const {
        values,
        setCNPJ,
        setName,
        setTelephone,
    } = useSignUpStore();
    const [submitted, setSubmitted] = useState(false);
    const validForm =
        values.cnpj.replaceAll(/[^0-9]/g, "").length === 14 &&
        values.name &&
        values.telephone.replaceAll(/[^0-9]/g, "").length === 11;

    function submit() {
        if (!validForm) return;
        setSubmitted(true);
    }

    if (submitted) {
        router.push("/signup/address");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <LogoContainer>
                   <LogoImg/>
                </LogoContainer>
                <Title>Cadastrar</Title>
                <Subtitle>
                    Por favor cadastre-se para continuar
                </Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title="CNPJ"
                        name="cnpj"
                        type="mask"
                        mask="99.999.999/9999-99"
                        required
                        value={values.cnpj}
                        onChange={(newValue) => setCNPJ(newValue)}
                    />
                    <Field
                        title="Nome do estabelecimento"
                        name="name"
                        type="text"
                        required
                        value={values.name}
                        onChange={(newValue) => setName(newValue)}
                    />
                    <Field
                        title="Telefone"
                        name="telephone"
                        type="mask"
                        mask="(99) 9 9999-9999"
                        required
                        value={values.telephone}
                        onChange={(newValue) =>
                            setTelephone(newValue)}
                    />
                    <Button disabled={!validForm}>continuar</Button>
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
