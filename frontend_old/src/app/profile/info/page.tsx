"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUser, usePatchUser } from "@/lib/user/userAPI";
import { Field } from "@/components/Field/Field";
import { Form } from "@/components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";

export default function ProfileInfoPage() {
    const router = useRouter();
    const [cnpj, setCNPJ] = useState("");
    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const { data, isPending: isPendingGet, mutate: mutateGet } =
        useGetUser();
    const {
        isPending: isPendingPatch,
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

    if (isSuccess) {
        router.push("/orders");
    }

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
                        disabled={isPendingGet || isPendingPatch}
                    />
                    <Field
                        title="Nome do estabelecimento"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={setName}
                        disabled={isPendingGet || isPendingPatch}
                    />
                    <Field
                        title="Telefone"
                        name="telephone"
                        type="mask"
                        mask="(99) 9 9999-9999"
                        required
                        value={telephone}
                        onChange={setTelephone}
                        disabled={isPendingGet || isPendingPatch}
                    />
                    <Field
                        title="E-mail"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={setEmail}
                        disabled={isPendingGet || isPendingPatch}
                    />
                    <Button
                        disabled={isPendingGet || isPendingPatch ||
                            !validForm}
                    >
                        Salvar informações
                    </Button>
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
