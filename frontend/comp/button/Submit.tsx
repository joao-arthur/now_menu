import type { JSX } from "react";

type Props = {
    readonly label: string;
};

export function Submit({ label }: Props): JSX.Element {
    return (
        <button
            className="w-full text-white font-bold bg-main rounded-lg cursor-pointer p-4 text-lg"
            type="submit"
        >
            {label}
        </button>
    );
}
