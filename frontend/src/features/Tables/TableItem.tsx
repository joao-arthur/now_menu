import { useEffect, useState } from "react";
import { TableAPI, useDeleteTable } from "@/api/table.api";
import { Modal } from "@/components/Modal/Modal";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";

export const Container = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
`;

export const TableName = styled.span`
    flex: 1;
`;

export const ButtonIcon = styled(Icon)`
    padding: 12px;
    cursor: pointer;
    border-radius: 6px;

    :active {
        background-color: lightgray;
    }
`;

type Props = {
    readonly table: TableAPI;
    readonly isLastItem: boolean;
    readonly onRemove: () => void;
};

export function TableItem(
    { table: { _id, name }, isLastItem, onRemove }: Props,
) {
    const { isSuccess, mutate } = useDeleteTable(_id);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (isSuccess) onRemove();
    }, [isSuccess]);

    return (
        <>
            <Container>
                <TableName key={_id}>{name}</TableName>
                {isLastItem
                    ? (
                        <ButtonIcon
                            name="HiTrash"
                            onClick={() => setModalVisible(true)}
                        />
                    )
                    : null}
            </Container>
            <Modal
                title="Deseja remover essa mesa?"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    setModalVisible(false);
                    mutate();
                }}
                visible={modalVisible}
                validForm
                cancel="Cancelar"
                confirm="Excluir"
            >
                Essa ação não pode ser desfeita
            </Modal>
        </>
    );
}
