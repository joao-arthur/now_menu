import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AnonimousPageFooter } from "../../../Components/AnonimousPageFooter/AnonimousPageFooter";
import { Field } from "../../../Components/Field/Field";
import { Form } from "../../../Components/Form/Form";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    PrimaryText,
    Title,
} from "../../../Components/Layout";
import { PageHeader } from "../../../Components/PageHeader/PageHeader";
import { orderRegisterActions } from "../../../Domains/orderRegister";
import { CartItem } from "./CartItem/CartItem";
import { ItemsContainer, ValueContainer } from "./OrderCart.styles";
import { item } from "../../../Domains/menuInfo";
import { usePostOrder } from "../../../Api/order.api";

export function OrderCart() {
    const dispatch = useAppDispatch();
    const { tableId } = useParams<{ tableId: string }>();
    const [name, setName] = useState("");
    const [success, setSuccess] = useState(false);
    const selectedItems = useAppSelector(({ orderRegister }) =>
        orderRegister
    );
    const allItems = useAppSelector(({ menuInfo }) =>
        menuInfo.categories
            .filter(
                ({ name }) =>
                    !["Mais caros", "Mais baratos"].includes(name),
            )
            .flatMap(({ name, items }) =>
                items.map((item) => ({ ...item, category: name }))
            )
    );
    const items = selectedItems.map((selectedItem) => ({
        ...(allItems.find((item) =>
            item.id === selectedItem.id
        ) as item),
        ...selectedItem,
    }));

    const validForm = !!name && !!selectedItems.length;

    const { isSuccess, isLoading, mutate } = usePostOrder({
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
            dispatch(orderRegisterActions.clear());
            setSuccess(true);
        }
    }, [dispatch, isSuccess]);

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (success) return <Redirect to={`/table/${tableId}/success`} />;
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
                        disabled={isLoading}
                    />
                </Form>
                <Button
                    disabled={!validForm || isLoading}
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
