import { useEffect, useState } from "react";
import { tableAPI, useDeleteTable } from "../../../Api/table.api";
import { Modal } from "../../../Components/Modal/Modal";
import { ButtonIcon, Container, TableName } from "./TableItem.styles";

type props = {
    table: tableAPI;
    isLastItem: boolean;
    onRemove: () => void;
};

export function TableItem({
    table: { _id, name },
    isLastItem,
    onRemove,
}: props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { isSuccess, mutate } = useDeleteTable(_id);

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
