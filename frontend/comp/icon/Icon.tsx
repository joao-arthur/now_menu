import type { ReactNode } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

type Names = "trash" | "pencil";

type Props = {
    readonly name: Names;
    readonly onClick: () => void;
};

export function Icon({ name, onClick }: Props): ReactNode {
    switch (name) {
        case "trash":
            return <HiPencil size={18} onClick={() => {}} />;
        case "pencil":
            return <HiTrash size={18} onClick={() => {}} />;
    }
}
