import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { CollapsableList } from "@/components/CollapsableList/CollapsableList";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import {
    FlexContainer,
    FlexContent,
    Padding,
    SecondaryButton,
    Title,
} from "@/components/Layout";
import { Modal } from "@/components/Modal/Modal";
import { useDeleteItem, useGetUserMenu } from "@/api/item.api";
import type { MenuItem } from "@/domains/menuInfo";
import { useMenuRegisterStore } from "@/domains/menuRegister";
import styled from "styled-components";
import { Input as BaseInput } from "@/components/Input/Input";

export const Category = styled.span`
    margin-bottom: 5px;
`;

export const Input = styled(BaseInput)`
    width: 100%;
`;

type Category = {
    readonly name: string;
    readonly items: readonly MenuItem[];
};

export function MenuEditInfo() {
    const { setCurrentCategory, setCurrentItemId } =
        useMenuRegisterStore();

    const [categories, setCategories] = useState<readonly Category[]>(
        [],
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [redirectToItem, setRedirectToItem] = useState("");
    const [redirectToNew, setRedirectToNew] = useState(false);
    const validForm = !!categories.length &&
        !!categories.flatMap((category) => category.items).length;

    const [itemToDelete, setItemToDelete] = useState("");
    const { isSuccess: isSuccessDelete, mutate: mutateDelete } =
        useDeleteItem(
            itemToDelete,
        );

    const { data, mutate } = useGetUserMenu();

    useEffect(() => {
        if (isSuccessDelete) mutate();
    }, [isSuccessDelete]);

    useEffect(() => {
        if (itemToDelete) {
            mutateDelete();
            setItemToDelete("");
        }
    }, [itemToDelete]);

    useEffect(() => {
        if (data) {
            setCategories(
                Array.from(
                    new Set(
                        data.items.map(({ category }) => category),
                    ),
                ).map((category) => ({
                    name: category,
                    items: data.items.filter((item) =>
                        item.category === category
                    ),
                })),
            );
        }
    }, [data]);

    function addItem(category: string) {
        setCurrentCategory(category);
        setRedirectToNew(true);
    }

    useEffect(() => {
        setCurrentItemId(undefined);
    }, []);

    useEffect(() => mutate(), []);

    function submit() {
        if (!validForm) return;
        mutate();
    }

    if (redirectToItem) {
        redirect(`/menu/edit/${redirectToItem}`);
    } else if (redirectToNew) {
        redirect("/menu/new");
    }

    return (
        <FlexContainer>
            <FlexContent>
                <PageHeader goBackLink="/menu" />
                <Title>Editar seu cardápio</Title>
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
                        onDeleteItem={setItemToDelete}
                        onEditItem={(id) => {
                            setRedirectToItem(id);
                        }}
                    />
                ))}
                <SecondaryButton
                    onClick={() => setModalVisible(true)}
                >
                    Adicionar categoria
                </SecondaryButton>
                <Padding />
            </FlexContent>
            <Modal
                title="Título da nova categoria"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    setCategories(
                        categories.concat({
                            name: newCategoryName,
                            items: [],
                        }),
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
