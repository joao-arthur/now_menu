import { useEffect, useState } from "react";
import { Icon } from "@/comp/icon/Icon";
import { TableAPI } from "@/lib/table/table";


type Props = {
    readonly table: TableAPI;
    readonly isLastItem: boolean;
    readonly onRemove: () => void;
};

export function TableItem(
    { table: { _id, name }, isLastItem, onRemove }: Props,
) {
    const [modalVisible, setModalVisible] = useState(false);


    return (
            <div className="flex h-8 items-center">
                <span key={_id}>{name}</span>
                {isLastItem
                    ? (
                        <Icon name="trash"
                        onClick={() => setModalVisible(true)}

                        />
                    )
                    : null}
            </div>
        
    );
}
