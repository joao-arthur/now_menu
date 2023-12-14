import { useState } from "react";
import { Modal } from "../Modal/Modal";
import {
    AddItemMessage,
    ButtonIcon,
    Container,
    DeleteCategory,
    IconContainer,
    ItemContainer,
    ItemName,
    ItemsContainer,
    ItemValue,
    Line,
    Title,
    TitleContainer,
} from "./CollapsableList.styles";

type item = {
    name: string;
    value: string;
    id: string;
};

type props = {
    name: string;
    items: item[];
    addMessage: string;
    onAddClick: (category: string) => void;
    onDeleteCategory?: () => void;
    onDeleteItem: (id: string) => void;
    onEditItem: (id: string) => void;
};

export function CollapsableList({
    name,
    items,
    onAddClick,
    addMessage,
    onDeleteCategory,
    onDeleteItem,
    onEditItem,
}: props) {
    const [deleteCategoryVisible, setDeleteCategoryVisible] =
        useState(false);
    const [itemToDelete, setItemToDelete] = useState<item>();

    return (
        <>
            <Container>
                <TitleContainer>
                    <Title>{name}</Title>
                    {onDeleteCategory
                        ? (
                            <DeleteCategory
                                name="HiTrash"
                                onClick={() =>
                                    setDeleteCategoryVisible(true)}
                            />
                        )
                        : null}
                </TitleContainer>
                <ItemsContainer>
                    {items.map((item) => (
                        <Line key={item.id}>
                            <ItemContainer>
                                <ItemName>{item.name}</ItemName>
                                <ItemValue>{item.value}</ItemValue>
                            </ItemContainer>
                            <IconContainer>
                                <ButtonIcon
                                    name="HiPencil"
                                    onClick={() =>
                                        onEditItem(item.id)}
                                />
                                <ButtonIcon
                                    name="HiTrash"
                                    onClick={() =>
                                        setItemToDelete(item)}
                                />
                            </IconContainer>
                        </Line>
                    ))}
                </ItemsContainer>
                <AddItemMessage onClick={() => onAddClick(name)}>
                    {addMessage}
                </AddItemMessage>
            </Container>
            <Modal
                title={`Deseja remover "${name}"?`}
                onCancel={() => setDeleteCategoryVisible(false)}
                onConfirm={() => {
                    if (onDeleteCategory) onDeleteCategory();
                }}
                visible={deleteCategoryVisible}
                validForm
                cancel="Cancelar"
                confirm="Excluir"
            >
                Essa ação não pode ser desfeita
            </Modal>
            <Modal
                title={`Deseja remover "${itemToDelete?.name}"?`}
                onCancel={() => setItemToDelete(undefined)}
                onConfirm={() => {
                    setItemToDelete(undefined);
                    if (itemToDelete) onDeleteItem(itemToDelete.id);
                }}
                visible={!!itemToDelete}
                validForm
                cancel="Cancelar"
                confirm="Excluir"
            >
                Essa ação não pode ser desfeita
            </Modal>
        </>
    );
}
