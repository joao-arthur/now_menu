import { Icon } from "./icon/Icon";

type ListItem = {
    readonly name: string;
    readonly value: string;
    readonly id: string;
};

type Props = {
    readonly name: string;
    readonly items: ListItem[];
    readonly addMessage: string;
    readonly onAddClick: (category: string) => void;
    readonly onDeleteItem: (id: string) => void;
    readonly onEditItem: (id: string) => void;
};

export function CollapsableList({
    name,
    items,
    onAddClick,
    addMessage,
    onDeleteItem,
    onEditItem,
}: Props) {
    return (
        <div className="flex flex-col rounded-lg bg-gray-100">
            <div className="flex items-center border-b border-gray-200">
                <span className="px-6 py-4">
                    {name}
                </span>
            </div>
            <div>
                {items.map((item) => (
                    <div
                        className="flex px-4 py-2 border-b items-center border-gray-200"
                        key={item.id}
                    >
                        <div className="flex flex-1 justify-between">
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="p-1 mx-1 cursor-pointer">
                                <Icon
                                    name="pencil"
                                    onClick={() => {}}
                                />
                            </div>
                            <div className="p-1 mx-1 cursor-pointer">
                                <Icon
                                    name="trash"
                                    onClick={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center py-2">
                <button onClick={() => onAddClick(name)} className="bg">{addMessage}</button>
            </div>
        </div>
    );
}
