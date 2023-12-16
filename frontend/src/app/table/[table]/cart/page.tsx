import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import { AnonimousPageFooter } from "@/components/AnonimousPageFooter/AnonimousPageFooter";
import { Field } from "@/components/Field/Field";
import { Form } from "@/components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    PrimaryText,
    Title,
} from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useOrderRegisterStore } from "@/domains/orderRegister";
import { CartItem } from "./CartItem/CartItem";
import { useMenuInfoStore } from "@/domains/menuInfo";
import type { MenuItem } from "@/domains/menuInfo";
import { usePostOrder } from "@/api/order.api";
import styled from "styled-components";

export const ValueContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ItemsContainer = styled.div`
    margin: 20px 0;
`;

export function OrderCart() {
    const { tableId } = useParams<{ tableId: string }>();
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);

    const { items: orderItems, clear } = useOrderRegisterStore();

    const selectedItems = orderItems;

    const { menuInfo } = useMenuInfoStore();

    const allItems = menuInfo.categories
        .filter(
            ({ name }) =>
                !["Mais caros", "Mais baratos"].includes(name),
        )
        .flatMap(({ name, items }) =>
            items.map((item) => ({ ...item, category: name }))
        );

    const items = selectedItems.map((selectedItem) => ({
        ...(allItems.find((item) =>
            item.id === selectedItem.id
        ) as MenuItem),
        ...selectedItem,
    }));

    const validForm = !!name && !!selectedItems.length;

    const { isSuccess, isPending, mutate } = usePostOrder({
        tableId,
        customer: name,
        items: items.map(
            (
                { id, name, amount, observation, prepareTime, price },
            ) => ({
                itemId: id,
                itemName: name,
                amount,
                observation,
                prepareTime,
                price,
            }),
        ),
    });

    useEffect(() => {
        if (isSuccess) {
            clear();
            setSuccess(true);
        }
    }, [isSuccess]);

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (success) redirect(`/table/${tableId}/success`);

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink={`/table/${tableId}`} />
                <Title>Meu carrinho</Title>
                <ItemsContainer>
                    {items.map((item) => (
                        <CartItem item={item} key={item.id} />
                    ))}
                </ItemsContainer>
                <ValueContainer>
                    <span>total</span>
                    <PrimaryText>
                        {(
                            items.reduce(
                                (sum, { price, amount }) =>
                                    sum + price * amount,
                                0,
                            ) / 100
                        ).toLocaleString(undefined, {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </PrimaryText>
                </ValueContainer>
                <Form onSubmit={submit}>
                    <Field
                        name="name"
                        title="Seu nome"
                        type="text"
                        value={name}
                        onChange={setName}
                        disabled={isPending}
                    />
                </Form>
                <Button
                    disabled={!validForm || isPending}
                    onClick={submit}
                >
                    Fazer pedido
                </Button>
                <Padding />
            </FlexContent>
            <AnonimousPageFooter selected />
        </FlexContainer>
    );
}
