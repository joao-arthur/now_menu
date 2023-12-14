import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks";
import { CollapsableList } from "../../../../Components/CollapsableList/CollapsableList";
import { PageHeader } from "../../../../Components/PageHeader/PageHeader";
import {
    FlexContainer,
    FlexContent,
    Padding,
    SecondaryButton,
    Title,
} from "../../../../Components/Layout";
import { Modal } from "../../../../Components/Modal/Modal";
import {
    useDeleteItem,
    useGetUserMenu,
} from "../../../../Api/item.api";
import { Input } from "./MenuEditInfo.styles";
import { item } from "../../../../Domains/menuInfo";
import { menuRegisterActions } from "../../../../Domains/menuRegister";

type category = {
    name: string;
    items: item[];
};

export function MenuEditInfo() {
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState<category[]>([]);
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
        dispatch(menuRegisterActions.setCurrentCategory(category));
        setRedirectToNew(true);
    }

    useEffect(() => {
        dispatch(menuRegisterActions.setCurrentItem(undefined));
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
