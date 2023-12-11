import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useGetUser, usePatchUser } from "../../Api/user.api";
import { Field } from "../../Components/Field/Field";
import { Form } from "../../Components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Title,
} from "../../Components/Layout";
import { PageHeader } from "../../Components/PageHeader/PageHeader";

export function EditPersonalInfo() {
    const [cnpj, setCNPJ] = useState("");
    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const { data, isLoading: isLoadingGet, mutate: mutateGet } =
        useGetUser();
    const {
        isLoading: isLoadingPatch,
        mutate: mutatePatch,
        isSuccess,
    } = usePatchUser({
        cnpj,
        name,
        telephone,
        email,
    });
    const validForm = cnpj && name && telephone && email;

    useEffect(() => {
        mutateGet();
    }, []);

    useEffect(() => {
        if (data) {
            setCNPJ(data.cnpj);
            setName(data.name);
            setTelephone(data.telephone);
            setEmail(data.email);
        }
    }, [data]);

    if (isSuccess) return <Redirect to="/orders" />;
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/profile" />
                <Title>Informações pessoais</Title>
                <Form onSubmit={() => mutatePatch()}>
                    <Field
                        title="CNPJ"
                        name="cnpj"
                        type="mask"
                        mask="99.999.999/9999-99"
                        required
                        value={cnpj}
                        onChange={setCNPJ}
                        disabled={isLoadingGet || isLoadingPatch}
                    />
                    <Field
                        title="Nome do estabelecimento"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={setName}
                        disabled={isLoadingGet || isLoadingPatch}
                    />
                    <Field
                        title="Telefone"
                        name="telephone"
                        type="mask"
                        mask="(99) 9 9999-9999"
                        required
                        value={telephone}
                        onChange={setTelephone}
                        disabled={isLoadingGet || isLoadingPatch}
                    />
                    <Field
                        title="E-mail"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={setEmail}
                        disabled={isLoadingGet || isLoadingPatch}
                    />
                    <Button
                        disabled={isLoadingGet || isLoadingPatch ||
                            !validForm}
                    >
                        Salvar informações
                    </Button>
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
