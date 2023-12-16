import { useState } from "react";
import { redirect } from "react-router-dom";
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
import { usePostItem } from "@/api/item.api";
import styled from "styled-components";
import { useMenuRegisterStore } from "@/domains/menuRegister";

export const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`;

export const CustomField = styled(Field)`
    min-width: 0;
`;

export function MenuItemNew() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [prepareHours, setPrepareHours] = useState(0);
    const [prepareMinutes, setPrepareMinutes] = useState(0);
    const [prepareSeconds, setPrepareSeconds] = useState(0);
    const [price, setPrice] = useState("");

    const { currentCategory } = useMenuRegisterStore();
    const category = currentCategory;

    const { isSuccess, mutate } = usePostItem({
        name,
        description,
        prepareTime: prepareHours * 3600 + prepareMinutes * 60 +
            prepareSeconds,
        price: Number(price.replace(",", ".")) * 100,
        category: category as string,
    });
    const validForm = name &&
        description &&
        (prepareHours || prepareMinutes || prepareSeconds) &&
        price;

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (isSuccess) {
        redirect("/menu/edit");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/menu/edit" />
                <Title>Adicionar produto</Title>
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
                        Adicionar produto
                    </Button>
                    <Padding />
                </Form>
            </FlexContent>
        </FlexContainer>
    );
}
