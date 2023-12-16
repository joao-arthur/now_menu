import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Field } from "@/components/Field/Field";
import { Form } from "@/components/Form/Form";
import {
    FlexContainer,
    FlexContent,
    Padding,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Amount } from "./Amount/Amount";
import { useGetMockedImage } from "@/api/image.api";
import styled from "styled-components";
import { useMenuInfoStore } from "@/domains/menuInfo";
import { useOrderRegisterStore } from "@/domains/orderRegister";

export const Image = styled.img`
    width: 100%;
    height: 150px;
    border-radius: 7px;
    object-fit: cover;
`;

export const Title = styled.h3`
    font-size: 1rem;
    margin-bottom: 10px;
`;

export const Observation = styled.span`
    font-size: 0.9rem;
    color: gray;
`;

export const PrepareTime = styled.div`
    margin-top: 5px;
    font-size: 0.7rem;
    color: gray;
`;

export const AddDiv = styled.div`
    display: flex;
`;

export const AddContainer = styled.div<{ enabled: boolean }>`
    margin-left: 10px;
    border-radius: 7px;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;

    ${({ enabled }) =>
    enabled
        ? `background-color: var(--primary); cursor: pointer;`
        : `background-color: var(--primaryDisabled);`}
`;

export const Add = styled.span`
    color: white;
    font-size: 0.9rem;
`;

export const Price = styled.span`
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
`;

export function OrderItem() {
    const [imageURL, setImageURL] = useState("");
    const { tableId, itemId } = useParams<
        { tableId: string; itemId: string }
    >();

    const { menuInfo } = useMenuInfoStore();
    const { addItem } = useOrderRegisterStore();

    const items = menuInfo.categories.flatMap(({ items }) => items);
    const [submitted, setSubmitted] = useState(false);
    const [amount, setAmount] = useState(1);
    const [observation, setObservation] = useState("");
    const item = items.find(({ id }) => id === itemId);
    const { data, mutate } = useGetMockedImage();

    useEffect(() => {
        mutate();
    }, []);

    useEffect(() => {
        if (data?.image) setImageURL(data.image);
    }, [data]);

    function submit() {
        if (amount < 1) return;
        if (!item) return;

        addItem({
            id: item.id,
            amount,
            observation,
        }), toast.success(`${item.name} adicionado ao carrinho!`);
        setSubmitted(true);
    }

    if (submitted) {
        redirect(`/table/${tableId}`);
    }

    if (!item) return null;

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink={`/table/${tableId}`} />
                <Image src={imageURL} />
                <Title>{item.name}</Title>
                <Observation>{item.description}</Observation>
                <PrepareTime>
                    ⏲️ Tempo de preparo de{" "}
                    {(item.prepareTime / 60).toFixed(2)} min
                </PrepareTime>
                <Form onSubmit={() => {}}>
                    <Field
                        disabled={amount < 1}
                        type="textarea"
                        name="observation"
                        title="Alguma observação?"
                        value={observation}
                        onChange={setObservation}
                    />
                </Form>
                <AddDiv>
                    <Amount value={amount} onChange={setAmount} />
                    <AddContainer
                        enabled={amount > 0}
                        onClick={submit}
                    >
                        <Add>Adicionar</Add>
                        <Price>
                            {((item.price * amount) / 100)
                                .toLocaleString(
                                    undefined,
                                    {
                                        style: "currency",
                                        currency: "BRL",
                                    },
                                )}
                        </Price>
                    </AddContainer>
                </AddDiv>
                <Padding />
            </FlexContent>
        </FlexContainer>
    );
}
