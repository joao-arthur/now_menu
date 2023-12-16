import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMenuRegisterStore } from "@/domains/menuRegister";
import { Field, Title as FieldTitle } from "@/components/Field/Field";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    Subtitle,
    Title,
} from "@/components/Layout";
import { Form } from "@/components/Form/Form";

export const FieldsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`;

export const CustomField = styled(Field)`
    min-width: 0;
`;

export default function MenuRegisterItemPage() {
    const router = useRouter();
    const {
        currentItemId,
        categories,
        editItem,
        addItem,
    } = useMenuRegisterStore();

    const editingItem = currentItemId;
    const items = categories.flatMap(({ items }) => items);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [prepareHours, setPrepareHours] = useState(0);
    const [prepareMinutes, setPrepareMinutes] = useState(0);
    const [prepareSeconds, setPrepareSeconds] = useState(0);
    const [price, setPrice] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const validForm = name &&
        description &&
        (prepareHours || prepareMinutes || prepareSeconds) &&
        price;

    useEffect(() => {
        if (!editingItem) return;
        const currentItem = items.find(({ id }) =>
            id === editingItem
        );
        if (!currentItem) return;

        const hours = Math.floor(currentItem.prepareTime / 3600);
        const minutes = Math.floor(
            (currentItem.prepareTime - hours * 3600) / 60,
        );
        const seconds = Math.floor(
            currentItem.prepareTime - hours * 3600 - minutes * 60,
        );

        setName(currentItem.name);
        setDescription(currentItem.description);
        setPrepareHours(hours);
        setPrepareMinutes(minutes);
        setPrepareSeconds(seconds);
        setPrice(
            (currentItem.price / 100).toString().replace(".", ","),
        );
    }, []);

    function submit() {
        if (!validForm) return;
        if (editingItem) {
            editItem({
                name,
                description,
                prepareTime: prepareHours * 3600 +
                    prepareMinutes * 60 +
                    prepareSeconds,
                price: Number(price.replace(",", ".")) * 100,
            });
        } else {
            addItem({
                name,
                description,
                prepareTime: prepareHours * 3600 +
                    prepareMinutes * 60 +
                    prepareSeconds,
                price: Number(price.replace(",", ".")) * 100,
            });
        }
        setSubmitted(true);
    }

    if (submitted) {
        router.push("/menu/register");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/menu/register" />
                <Title>Adicionar produto</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
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
                        {editingItem
                            ? "Salvar edição"
                            : "Adicionar produto"}
                    </Button>
                </Form>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
