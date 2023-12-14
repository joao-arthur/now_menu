import { useState } from "react";
import { redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Field } from "../../Components/Field/Field";
import { PageHeader } from "../../Components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Link,
    PrimaryText,
    SecondaryAction,
    Subtitle,
    Title,
} from "../../Components/Layout";
import { signUpActions } from "../../Domains/signUp";
import { Form } from "../../Components/Form/Form";

export function SignUpAddress() {
    const dispatch = useAppDispatch();
    const { cep, address, district, city, state } = useAppSelector(
        ({ signUp }) => signUp,
    );
    const [submitted, setSubmitted] = useState(false);
    const validForm = cep.replaceAll(/[^0-9]/g, "").length === 8 &&
        address &&
        district &&
        city &&
        state;

    function submit() {
        if (!validForm) return;
        setSubmitted(true);
    }

    if (submitted) redirect("/signup/account");

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
                        value={cep}
                        onChange={(newValue) =>
                            dispatch(signUpActions.setCEP(newValue))}
                    />
                    <Field
                        title="Endereço"
                        name="address"
                        type="text"
                        required
                        value={address}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setAddress(newValue),
                            )}
                    />
                    <Field
                        title="Bairro"
                        name="bairro"
                        type="text"
                        required
                        value={district}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setDistrict(newValue),
                            )}
                    />
                    <Field
                        title="Cidade"
                        name="city"
                        type="text"
                        required
                        value={city}
                        onChange={(newValue) =>
                            dispatch(signUpActions.setCity(newValue))}
                    />
                    <Field
                        title="Estado"
                        name="state"
                        type="text"
                        required
                        value={state}
                        onChange={(newValue) =>
                            dispatch(
                                signUpActions.setState(newValue),
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
