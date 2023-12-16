import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useMenuRegisterStore } from "@/domains/menuRegister";
import { req } from "@/core/req";
import { CollapsableList } from "@/components/CollapsableList/CollapsableList";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    Button,
    FlexContainer,
    FlexContent,
    Padding,
    SecondaryButton,
    Subtitle,
    Text,
    Title,
} from "@/components/Layout";
import { Toast } from "@/components/Toast";
import { Modal } from "@/components/Modal/Modal";
import { Input as BaseInput } from "@/components/Input/Input";

export const Category = styled.span`
    margin-bottom: 5px;
`;

export const Input = styled(BaseInput)`
    width: 100%;
`;

export default function MenuRegisterPage() {
    const router = useRouter();
    const {
        categories,
        setCurrentCategory,
        setCurrentItemId,
        deleteCategory,
        deleteItem,
        addCategory,
    } = useMenuRegisterStore();

    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [redirectToItem, setRedirectToItem] = useState(false);
    const validForm = !!categories.length &&
        !!categories.flatMap((category) => category.items).length;

    function addItem(category: string) {
        setCurrentCategory(category);
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
        setCurrentItemId(undefined);
    }, []);

    function submit() {
        if (!validForm) return;
        mutate();
    }
    FlexContainer;

    if (redirectToItem) {
        router.push("/menu/register/item");
    } else if (isSuccess) {
        router.push("/menu/register/success");
    }

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
                            deleteCategory(
                                category.name,
                            )}
                        onDeleteItem={(id) => {
                            deleteItem(id);
                        }}
                        onEditItem={(id) => {
                            setCurrentItemId(
                                id,
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
                    addCategory(
                        newCategoryName,
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
