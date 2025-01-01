import type { ReactNode } from "react";
import {
    HiBuildingStorefront,
    HiClipboardDocumentList,
    HiPencil,
    HiShoppingBag,
    HiTrash,
} from "react-icons/hi2";
import { GiKnifeFork } from "react-icons/gi";

type Names = "trash" | "pencil" | "clipboard" | "store" | "shopping-bag" | "fork-and-knife";

type Props = {
    readonly name: Names;
    readonly onClick: () => void;
};

export function Icon({ name, onClick }: Props): ReactNode {
    const props = {
        size: 18,
        onClick,
    } as const;

    switch (name) {
        case "trash":
            return <HiTrash {...props} />;
        case "pencil":
            return <HiPencil {...props} />;
        case "clipboard":
            return <HiClipboardDocumentList {...props} />;
        case "store":
            return <HiBuildingStorefront {...props} />;
        case "shopping-bag":
            return <HiShoppingBag {...props} />;
        case "fork-and-knife":
            return <GiKnifeFork {...props} />;
    }
}
