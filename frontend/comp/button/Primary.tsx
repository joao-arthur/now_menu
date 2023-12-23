import type { JSX } from "react";

type Props = {
    readonly label: string;
    readonly onClick?: () => void;
};

export function Primary({ label, onClick }: Props): JSX.Element {
    return (
        <button
            className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg"
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    );
}
