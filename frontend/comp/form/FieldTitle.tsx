import type { JSX } from "react";

type Props = {
    readonly label: string;
};

export function FieldTitle({ label }: Props): JSX.Element {
    return (
        <span className="text-typography text-sm">
            {label}
        </span>
    );
}
