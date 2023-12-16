import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { req } from "../../../../core/req";
import { CollapsableList } from "../../../../components/CollapsableList/CollapsableList";
import { PageHeader } from "../../../../components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    SecondaryButton,
    Subtitle,
    Text,
    Title,
} from "../../../../components/Layout";
import { menuRegisterActions } from "../../../../Domains/menuRegister";
import { Toast } from "../../../../components/Toast";
import { Modal } from "../../../../components/Modal/Modal";
import { Category, Input } from "./MenuRegisterInfo.styles";
import styled from "styled-components";
import { Input as BaseInput } from "../../../../components/Input/Input";

export const Category = styled.span`
    margin-bottom: 5px;
`;

export const Input = styled(BaseInput)`
    width: 100%;
`;

export function MenuRegisterInfo() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(
        ({ menuRegister }) => menuRegister.categories,
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [redirectToItem, setRedirectToItem] = useState(false);
    const validForm = !!categories.length &&
        !!categories.flatMap((category) => category.items).length;

    function addItem(category: string) {
        dispatch(menuRegisterActions.setCurrentCategory(category));
        setRedirectToItem(true);
    }

    const { isSuccess, isPending, mutate } = useMutation({
        mutationKey: ["menuRegister"],
        mutationFn: () => {
            const items = categories.flatMap((category) =>
                category.items.map((
                    { name, description, prepareTime, price },
                ) => ({
                    name,
                    description,
                    prepareTime,
                    price,
                    category: category.name,
                }))
            );

            const request = req.post("item/menu", items);

            return Toast(request, {
                loading: "Cadastrando...",
                error: "Não foi possível cadastrar o cardápio!",
                success: "Cardápio cadastrado com sucesso!",
            });
        },
    });

    useEffect(() => {
        dispatch(menuRegisterActions.setCurrentItem(undefined));
    }, []);

    function submit() {
        if (!validForm) return;
        mutate();
    }
    FlexContainer;

    if (redirectToItem) redirect("/menu/register/item");
    if (isSuccess) redirect("/menu/register/success");
    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader showSkipLink />
                <Title>Cadastrar seu cardápio</Title>
                <Subtitle>Por favor preencha para continuar</Subtitle>
                <Category>Categorias</Category>
                {categories.map((category) => (
                    <CollapsableList
                        key={category.name}
                        name={category.name}
                        items={category.items.map((item) => ({
                            name: item.name,
                            value: (item.price / 100).toLocaleString(
                                undefined,
                                {
                                    style: "currency",
                                    currency: "BRL",
                                },
                            ),
                            id: item.id,
                        }))}
                        addMessage="Adicionar produto"
                        onAddClick={addItem}
                        onDeleteCategory={() =>
                            dispatch(
                                menuRegisterActions.deleteCategory(
                                    category.name,
                                ),
                            )}
                        onDeleteItem={(id) => {
                            dispatch(
                                menuRegisterActions.deleteItem(id),
                            );
                        }}
                        onEditItem={(id) => {
                            dispatch(
                                menuRegisterActions.setCurrentItem(
                                    id,
                                ),
                            );
                            setRedirectToItem(true);
                        }}
                    />
                ))}
                <SecondaryButton
                    onClick={() => setModalVisible(true)}
                >
                    Adicionar categoria
                </SecondaryButton>
                <Text>
                    Todas as informações poderão ser editadas
                    posteriormente
                </Text>
                <Button
                    disabled={!validForm || isPending}
                    onClick={submit}
                >
                    Finalizar cardápio
                </Button>
                <Padding />
            </FlexContent>
            <Modal
                title="Título da nova categoria"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    dispatch(
                        menuRegisterActions.addCategory(
                            newCategoryName,
                        ),
                    );
                    setNewCategoryName("");
                    setModalVisible(false);
                }}
                visible={modalVisible}
                validForm={!!newCategoryName}
                cancel="Cancelar"
                confirm="Adicionar"
            >
                <Input
                    name="newCategoryName"
                    type="text"
                    value={newCategoryName}
                    onChange={setNewCategoryName}
                />
            </Modal>
        </FlexContainer>
    );
}
