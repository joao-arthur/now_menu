"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Field, Title as FieldTitle } from "@/components/Field/Field";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Title,
} from "@/components/Layout";
import { Form } from "@/components/Form/Form";
import { useGetItem, usePatchItem } from "@/lib/item/itemAPI";

 const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`;

 const CustomField = styled(Field)`
    min-width: 0;
`;

export default function MenuEditIdPage() {
    const router = useRouter();
    const id = router?.params?.id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [prepareHours, setPrepareHours] = useState(0);
    const [prepareMinutes, setPrepareMinutes] = useState(0);
    const [prepareSeconds, setPrepareSeconds] = useState(0);
    const [price, setPrice] = useState("");

    const validForm = name &&
        description &&
        (prepareHours || prepareMinutes || prepareSeconds) &&
        price;
    const { data, mutate } = useGetItem(id);
    const { isSuccess, mutate: mutatePatch } = usePatchItem(id, {
        name,
        description,
        prepareTime: prepareHours * 3600 + prepareMinutes * 60 +
            prepareSeconds,
        price: Number(price.replace(",", ".")) * 100,
    });

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (!data) return;
        const hours = Math.floor(data.prepareTime / 3600);
        const minutes = Math.floor(
            (data.prepareTime - hours * 3600) / 60,
        );
        const seconds = Math.floor(
            data.prepareTime - hours * 3600 - minutes * 60,
        );
        setName(data.name);
        setDescription(data.description);
        setPrepareHours(hours);
        setPrepareMinutes(minutes);
        setPrepareSeconds(seconds);
        setPrice((data.price / 100).toString().replace(".", ","));
    }, [data]);

    function submit() {
        if (!validForm) return;
        mutatePatch();
    }

    if (isSuccess) {
        router.push("/menu/edit");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/menu/edit" />
                <Title>Editar produto</Title>
                <Form onSubmit={submit}>
                    <Field
                        title="Nome"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={setName}
                    />
                    <Field
                        title="Descrição"
                        name="description"
                        type="textarea"
                        required
                        value={description}
                        onChange={setDescription}
                    />
                    <FieldTitle>Tempo estimado de preparo</FieldTitle>
                    <FieldsContainer>
                        <CustomField
                            title="Hora(s)"
                            name="prepareHours"
                            type="number"
                            required
                            value={prepareHours}
                            onChange={(newValue) => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 24
                                ) {
                                    setPrepareHours(Number(newValue));
                                }
                            }}
                            min={0}
                            max={23}
                        />
                        <CustomField
                            title="Minuto(s)"
                            name="prepareMinutes"
                            type="number"
                            required
                            value={prepareMinutes}
                            onChange={(newValue) => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 60
                                ) {
                                    setPrepareMinutes(
                                        Number(newValue),
                                    );
                                }
                            }}
                            min={0}
                            max={59}
                        />
                        <CustomField
                            title="Segundo(s)"
                            name="prepareSeconds"
                            type="number"
                            required
                            value={prepareSeconds}
                            onChange={(newValue) => {
                                if (
                                    Number(newValue) > -1 &&
                                    Number(newValue) < 60
                                ) {
                                    setPrepareSeconds(
                                        Number(newValue),
                                    );
                                }
                            }}
                            min={0}
                            max={59}
                        />
                    </FieldsContainer>
                    <Field
                        title="Preço"
                        name="price"
                        type="money"
                        required
                        value={price}
                        onChange={setPrice}
                    />
                    <Field title="Foto" name="picture" type="file" />
                    <Button disabled={!validForm}>
                        Salvar edição
                    </Button>
                    <Padding />
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
