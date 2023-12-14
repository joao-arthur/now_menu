import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Field } from "../../../Components/Field/Field";
import { Form } from "../../../Components/Form/Form";
import {
    FlexContainer,
    FlexContent,
    Padding,
} from "../../../Components/Layout";
import { PageHeader } from "../../../Components/PageHeader/PageHeader";
import { orderRegisterActions } from "../../../Domains/orderRegister";
import { Amount } from "./Amount/Amount";
import {
    Add,
    AddContainer,
    AddDiv,
    Image,
    Observation,
    PrepareTime,
    Price,
    Title,
} from "./OrderItem.styles";
import { useGetMockedImage } from "../../../Api/image.api";

export function OrderItem() {
    const [imageURL, setImageURL] = useState("");
    const dispatch = useAppDispatch();
    const { tableId, itemId } = useParams<
        { tableId: string; itemId: string }
    >();
    const items = useAppSelector(({ menuInfo }) =>
        menuInfo.categories.flatMap(({ items }) => items)
    );
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
        dispatch(
            orderRegisterActions.addItem({
                id: item.id,
                amount,
                observation,
            }),
        );
        toast.success(`${item.name} adicionado ao carrinho!`);
        setSubmitted(true);
    }

    if (!item) return null;
    if (submitted) redirect(`/table/${tableId}`);

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
