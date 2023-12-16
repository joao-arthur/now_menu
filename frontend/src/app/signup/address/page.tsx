import { useState } from "react";
import { useRouter } from "next/router";
import { useSignUpStore } from "@/domains/signUp";
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

export default function SignUpAddressPage() {
    const router = useRouter();
    const {
        values,
        setCEP,
        setAddress,
        setDistrict,
        setCity,
        setState,
    } = useSignUpStore();
    const [submitted, setSubmitted] = useState(false);
    const validForm =
        values.cep.replaceAll(/[^0-9]/g, "").length === 8 &&
        values.address &&
        values.district &&
        values.city &&
        values.state;

    function submit() {
        if (!validForm) return;
        setSubmitted(true);
    }

    if (submitted) {
        router.push("/signup/account");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/signup/info" />
                <Title>Endereço</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Form onSubmit={submit}>
                    <Field
                        title="CEP"
                        name="cep"
                        type="mask"
                        mask="99999-999"
                        required
                        value={values.cep}
                        onChange={(newValue) => setCEP(newValue)}
                    />
                    <Field
                        title="Endereço"
                        name="address"
                        type="text"
                        required
                        value={values.address}
                        onChange={(newValue) => setAddress(newValue)}
                    />
                    <Field
                        title="Bairro"
                        name="bairro"
                        type="text"
                        required
                        value={values.district}
                        onChange={(newValue) => setDistrict(newValue)}
                    />
                    <Field
                        title="Cidade"
                        name="city"
                        type="text"
                        required
                        value={values.city}
                        onChange={(newValue) => setCity(newValue)}
                    />
                    <Field
                        title="Estado"
                        name="state"
                        type="text"
                        required
                        value={values.state}
                        onChange={(newValue) => setState(newValue)}
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
