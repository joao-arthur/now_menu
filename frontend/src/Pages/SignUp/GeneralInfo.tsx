import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Field } from "../../Components/Field/Field";
import { Form } from "../../Components/Form/Form";
import { Image } from "../../Components/Image/Image";
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
} from "../../Components/Layout";
import { signUpActions } from "../../Domains/signUp";

export function SignUpGeneralInfo() {
    const dispatch = useAppDispatch();
    const { cnpj, name, telephone } = useAppSelector(({ signUp }) =>
        signUp
    );
    const [submitted, setSubmitted] = useState(false);
    const validForm = cnpj.replaceAll(/[^0-9]/g, "").length === 14 &&
        name &&
        telephone.replaceAll(/[^0-9]/g, "").length === 11;

    function submit() {
        if (!validForm) return;
        setSubmitted(true);
    }

    if (submitted) return <Redirect to="/signup/address" />;

    return (
        <FlexContainer>
            <FlexContent>
                <LogoContainer>
                    <Image name="logo" height={240} width={230} />
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
                        value={cnpj}
                        onChange={(newValue) =>
                            dispatch(signUpActions.setCNPJ(newValue))}
                    />
                    <Field
                        title="Nome do estabelecimento"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(newValue) =>
                            dispatch(signUpActions.setName(newValue))}
                    />
                    <Field
                        title="Telefone"
                        name="telephone"
                        type="mask"
                        mask="(99) 9 9999-9999"
                        required
                        value={telephone}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setTelephone(newValue),
                            )}
                    />
                    <Button disabled={!validForm}>continuar</Button>
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
